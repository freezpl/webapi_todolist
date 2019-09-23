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
    }
}
