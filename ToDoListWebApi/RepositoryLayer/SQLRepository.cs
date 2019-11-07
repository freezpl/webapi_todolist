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
                .Include(t => t.Category).Include(t => t.Tags).ThenInclude(tag => tag.Tag).ToListAsync();
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
            return await Task.Run(() =>
            {
                IEnumerable<TagEntity> tags = (limit > 0) ?
                 _context.Set<TagEntity>().Take(limit).AsEnumerable() :
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

        public async Task<bool> AddTask(TaskDto task)
        {
            UserEntity user = await _userManager.FindByIdAsync(task.UserId);
            if (user == null)
                return false;

            TaskEntity taskEntity = new TaskEntity
            {
                Description = task.Description,
                Category = await _context.Set<CategoryEntity>().FindAsync(task.Category.Id),
                Priority = task.Priority,
                Date = DateTime.Now,
                User = user,
                Tags = new List<TaskTag>()
            };

            await _context.Set<TaskEntity>().AddAsync(taskEntity);
            await _context.SaveChangesAsync();

            if (task.Tags.Count > 0)
            {
                await AddTags(task.Tags);
                foreach (var tag in task.Tags)
                {
                    TagEntity tagEntity = await _context.Set<TagEntity>().FirstOrDefaultAsync(t => t.Name == tag.Name);
                    if (tagEntity == null)
                        continue;
                    taskEntity.Tags.Add(new TaskTag { TaskId = taskEntity.Id, Task = taskEntity,
                        TagId = tagEntity.Id, Tag = tagEntity });
                }
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task AddTags(IEnumerable<TagDto> tags)
        {
            foreach (var tag in tags)
            {
                TagEntity tagEntity = await _context.Set<TagEntity>().FindAsync(tag.Id);
                if (tagEntity == null)
                    await _context.Set<TagEntity>().AddAsync(_mapper.Map<TagDto, TagEntity>(tag));
            }
            await _context.SaveChangesAsync();
        }
    }
}
