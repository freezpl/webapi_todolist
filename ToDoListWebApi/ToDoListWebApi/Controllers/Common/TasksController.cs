using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DtoModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RepositoryLayer.Interfaces;
using ToDoListWebApi.Helpers;

namespace ToDoListWebApi.Controllers.Common
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        IRepository _repository;

        public TasksController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [CustomAuthorize]
        [Authorize]
        [ValidateModel]
        //[Authorize("Bearer")]
        public async Task<IEnumerable<TaskDto>>Get()
        {
           return await _repository.GetTasks();
        }
    }
}