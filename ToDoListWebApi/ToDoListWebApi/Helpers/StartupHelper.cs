using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RepositoryLayer.DAL;
using RepositoryLayer.DAL.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListWebApi.Helpers
{
    public static class StartupHelper
    {
        public static void EnshurePopulated(IApplicationBuilder builder)
        {
            ToDoContext context = (ToDoContext)builder.ApplicationServices.GetService(typeof(ToDoContext));
            context.Database.Migrate();

            if (!context.Tasks.Any())
            {
                TagEntity[] tags = new TagEntity[]
                {
                    new TagEntity{Name = "Продукти", Color="#32a842"},
                    new TagEntity{Name = "М'ясо", Color="#c70442"},
                    new TagEntity{Name = "Пиво", Color="#94007b"},
                    new TagEntity{Name = "Уроки", Color="#002594"},
                    new TagEntity{Name = "WebApi", Color="#19223d"}
                };

                context.AddRange(tags);

                CategoryEntity[] categories = new CategoryEntity[]
                {
                    new CategoryEntity{Name = "Навчання"},
                    new CategoryEntity{Name = "Їжа"},
                    new CategoryEntity{Name = "Відпочинок"},
                };

                context.AddRange(categories);

                //addTasks
                TaskEntity task1 = new TaskEntity
                {
                    Description = "Зробити домашку по WebApi",
                    Category = categories[0],
                    Date = DateTime.Now - TimeSpan.FromDays(1),
                    Priority = 1
                };

                context.Add<TaskEntity>(task1);
                ICollection<TagEntity> tags1 = new List<TagEntity>() { tags[3], tags[4] };
                task1.Tags = new List<TaskTag>();
                foreach (var tag in tags1)
                {
                    task1.Tags.Add( new TaskTag { Task = task1, Tag = tag});
                }

                TaskEntity task2 = new TaskEntity
                {
                    Description = "Випити пивка з друзями",
                    Category = categories[2],
                    Date = DateTime.Now + TimeSpan.FromDays(1),
                    Priority = 5
                };

                context.Add<TaskEntity>(task2);
                ICollection<TagEntity> tags2 = new List<TagEntity>() { tags[0], tags[2] };
                task2.Tags = new List<TaskTag>();
                foreach (var tag in tags2)
                {
                    task2.Tags.Add(new TaskTag { Task = task2, Tag = tag });
                }

                context.SaveChanges();
            }

        }
    }
}
