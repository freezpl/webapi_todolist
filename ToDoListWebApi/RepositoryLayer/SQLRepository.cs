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
        //DbSet<T>

        public SQLRepository(DbContext context, UserManager<UserEntity> userManager)
        {
            _context = context;
            //_dbSet = _context.Set<T>();

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

        public async Task<IEnumerable<TaskDto>> GetUserTasks(string name)
        {
            var user = await _userManager.FindByEmailAsync(name);
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
    }
}
