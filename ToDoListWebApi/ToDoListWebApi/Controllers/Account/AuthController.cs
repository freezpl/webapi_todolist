using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DtoModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RepositoryLayer.DAL.EntityModels;
using ToDoListWebApi.Helpers;

namespace ToDoListWebApi.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UserManager<UserEntity> _userManager;

        public AuthController(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        //[Authorize("Bearer")]
        [Authorize]
        public bool Check()
        {
            return true;
        }


        [HttpPost]
        public async Task<string> Login(LoginDto user)
        {
            var email = user.Email;
            var password = user.Password;

            KeyValuePair<UserEntity, ClaimsIdentity> loginData = await GetIdentity(email, password);
            if (loginData.Value == null)
            {
                return "Invalid username or password.";
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: loginData.Value.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                username = loginData.Key.Email,
                user_id = loginData.Key.Id
            };
            return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }

        private async Task<KeyValuePair<UserEntity, ClaimsIdentity>> GetIdentity(string email, string password)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email)
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return new KeyValuePair<UserEntity, ClaimsIdentity>(user, claimsIdentity);
            }
            return new KeyValuePair<UserEntity, ClaimsIdentity>();
        }
    }
}