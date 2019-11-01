using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RepositoryLayer.DAL.EntityModels;
using RepositoryLayer.Interfaces;
using DtoModels;

namespace ToDoListWebApi.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        IRepository _repository;
        UserManager<UserEntity> _userManager;

        public CategoriesController(IRepository repository,
                                UserManager<UserEntity> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> Get()
        {
            return await _repository.GetCategories();
        }
    }
}