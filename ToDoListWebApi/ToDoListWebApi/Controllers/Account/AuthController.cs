﻿using System;
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
        AuthOptions _authOptions;

        public AuthController(UserManager<UserEntity> userManager, AuthOptions authOptions)
        {
            _userManager = userManager;
            _authOptions = authOptions;
        }

        [HttpGet("check/{login}")]
        public async Task<bool> CheckLogin(string login)
        {
            return (await _userManager.FindByEmailAsync(login) != null) ? true : false;
        }

        [HttpPost("register")]
        public async Task<bool> Register(RegisterDto user)
        {
            UserEntity userEntity = new UserEntity { Email = user.Email, UserName = user.Name  };
            IdentityResult res = await _userManager.CreateAsync(userEntity, user.Password);
            return (res.Succeeded) ? true : false;
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

            return _authOptions.GenerateToken(loginData);
        }

        private async Task<KeyValuePair<UserEntity, ClaimsIdentity>> GetIdentity(string email, string password)
        {
            UserEntity user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {


                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return new KeyValuePair<UserEntity, ClaimsIdentity>(user, claimsIdentity);
            }
            return new KeyValuePair<UserEntity, ClaimsIdentity>();
        }
    }
}