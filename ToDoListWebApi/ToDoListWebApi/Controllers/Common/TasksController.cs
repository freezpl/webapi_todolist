using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DtoModels;
using Microsoft.AspNetCore.Authorization;
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
        [CustomAuthorize]
        [Authorize]
        [ValidateModel]
        //[Authorize("Bearer")]
        public async Task<IEnumerable<TaskDto>>Get()
        {
            string name = HttpContext.User.Identity.Name;
           return await _repository.GetUserTasks(name);
        }
    }
}