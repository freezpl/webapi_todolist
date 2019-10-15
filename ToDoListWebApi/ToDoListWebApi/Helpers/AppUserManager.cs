using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RepositoryLayer.DAL.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ToDoListWebApi.Helpers
{
    public class AppUserManager : UserManager<UserEntity>
    {
        public AppUserManager(IUserStore<UserEntity> store,
                                IOptions<IdentityOptions> optionsAccessor,
                                IPasswordHasher<UserEntity> passwordHasher,
                                IEnumerable<IUserValidator<UserEntity>> userValidators,
                                IEnumerable<IPasswordValidator<UserEntity>> passwordValidators,
                                ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors,
                                IServiceProvider services, ILogger<UserManager<UserEntity>> logger) :
        base(store,
            optionsAccessor,
            passwordHasher,
            userValidators,
            passwordValidators,
            keyNormalizer,
            errors,
            services,
            logger)
        {

        }

        public async Task<string> GetEmailAsync(ClaimsPrincipal principal)
        {
            var user = await GetUserAsync(principal);
            return user.Email;
        }
    }
}
