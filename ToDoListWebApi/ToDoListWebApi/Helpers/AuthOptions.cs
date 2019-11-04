using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoListWebApi.Helpers
{
    public class AuthOptions
    {
        public const string ISSUER = "Pasha";
        public const string AUDIENCE = "ToDoList";
        const string KEY = "mysupersecret_secretkey!123";
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

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        { 
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}