using AutoMapper;
using DtoModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.DAL.EntityModels;
using RepositoryLayer.Helpers;
using RepositoryLayer.Interfaces;
using System;
using System.Collections.Generic;
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
    }
}
