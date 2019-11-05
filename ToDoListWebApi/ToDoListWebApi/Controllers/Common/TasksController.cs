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
using RepositoryLayer.DAL.EntityModels;
using RepositoryLayer.Interfaces;
using ToDoListWebApi.Helpers;

namespace ToDoListWebApi.Controllers.Common
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        IRepository _repository;
        UserManager<UserEntity> _userManager;

        public TasksController(IRepository repository, 
                                UserManager<UserEntity> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        [HttpGet]
        //[CustomAuthorize]
        [Authorize]
        //[ValidateModel]
        //[Authorize("Bearer")]
        public async Task<IEnumerable<TaskDto>>Get()
        { 
            var id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
           //var name = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
           //var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
           // string namesdd = HttpContext.User.Identity.Name;
           return await _repository.GetUserTasks(id);
        }
    }
}