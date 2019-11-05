using AutoMapper;
using DtoModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.DAL.EntityModels;
using RepositoryLayer.Helpers;
using RepositoryLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class SQLRepository : IRepository
    {
        DbContext _context;
        IMapper _mapper;
        UserManager<UserEntity> _userManager;

        public SQLRepository(DbContext context, UserManager<UserEntity> userManager)
        {
            _context = context;
            _userManager = userManager;
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MapperSettings());
            });
            _mapper = mappingConfig.CreateMapper();
        }

        public async Task<IEnumerable<TaskDto>> GetTasks()
        {
            List<TaskEntity> tasks = await _context.Set<TaskEntity>()
                .Include(t => t.Category).Include(t => t.Tags).ThenInclude(tag =>tag.Tag).ToListAsync();
            return _mapper.Map<IEnumerable<TaskEntity>, IEnumerable<TaskDto>>(tasks);
        }

        public async Task<IEnumerable<TaskDto>> GetUserTasks(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            List<TaskEntity> tasks = await _context.Set<TaskEntity>().Where(x => x.User.Id == user.Id)
                .Include(t => t.Category).Include(t => t.Tags).ThenInclude(tag => tag.Tag)
                .ToListAsync();
            return _mapper.Map<IEnumerable<TaskEntity>, IEnumerable<TaskDto>>(tasks);
        }

        public async Task<List<CategoryDto>> GetCategories()
        {
            List<CategoryEntity> categories = await _context.Set<CategoryEntity>().ToListAsync();
            return _mapper.Map<List<CategoryEntity>, List<CategoryDto>>(categories);
        }

        public async Task<IEnumerable<TagDto>> GetTags(int limit)
        {
            return await Task.Run(()=>
            {
                IEnumerable<TagEntity> tags = (limit > 0) ?
                 _context.Set<TagEntity>().Take(limit).AsEnumerable():
                 _context.Set<TagEntity>().AsEnumerable();
                return _mapper.Map<IEnumerable<TagEntity>, IEnumerable<TagDto>>(tags);
            });
        }

        public async Task<IEnumerable<TagDto>> SearchTags(string tagName, int limit = 0)
        {
            return await Task.Run(() =>
            {
                IEnumerable<TagEntity> tags = (limit > 0) ?
                 _context.Set<TagEntity>()
                 .Where(t => t.Name.Contains(tagName))
                 .Take(limit).AsEnumerable() :
                 _context.Set<TagEntity>().AsEnumerable();
                return _mapper.Map<IEnumerable<TagEntity>, IEnumerable<TagDto>>(tags);
            });
        }

        public bool AddTask(TaskDto task)
        {



            return true;
        }
    }
}
