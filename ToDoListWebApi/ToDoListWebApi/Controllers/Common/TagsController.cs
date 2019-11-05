using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DtoModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.Interfaces;

namespace ToDoListWebApi.Controllers.Common
{
    [Route("[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        IRepository _repository;
        IConfiguration _config;

        public TagsController(IRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _config = configuration;
        }

        [HttpGet]
        public Task<IEnumerable<TagDto>>Get()
        {
            return _repository.GetTags(_config.GetValue<int>("SearchOptions:searchRecordsLimit"));
        }

        [HttpGet("{searchText}")]
        public async Task<IEnumerable<TagDto>> Get(string searchText)
        {
            return await _repository.SearchTags(searchText,
                _config.GetValue<int>("SearchOptions:searchRecordsLimit"));
        }
    }
}