using DtoModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IRepository
    {
        Task<IEnumerable<TaskDto>> GetTasks();
        Task<IEnumerable<TaskDto>> GetUserTasks(string id);
        Task<List<CategoryDto>> GetCategories();
        Task<IEnumerable<TagDto>> GetTags(int limit = 0);
        Task<IEnumerable<TagDto>> SearchTags(string tagName, int limit = 0);

    }
}
