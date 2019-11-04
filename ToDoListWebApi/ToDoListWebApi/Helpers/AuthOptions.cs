using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RepositoryLayer.DAL.EntityModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ToDoListWebApi.Helpers
{
    public class AuthOptions
    {
        public const int LIFETIME = 1;

        private readonly IConfiguration _config;

        public AuthOptions(IConfiguration configuration)
        {
            _config = configuration;
        }

        public SymmetricSecurityKey GetKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("JwtOptions:key")));
        }

        public string GenerateToken(KeyValuePair<UserEntity, ClaimsIdentity> loginData)
        {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: _config.GetValue<string>("JwtOptions:issuer"),
                    audience: _config.GetValue<string>("JwtOptions:audience"),       
                    claims: loginData.Value.Claims,
                    expires: now.Add(TimeSpan.FromDays(_config.GetValue<int>("JwtOptions:lifetime"))),
                    signingCredentials: new SigningCredentials(GetKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                username = loginData.Key.Email,
                user_id = loginData.Key.Id
            };
            return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }
    }
}