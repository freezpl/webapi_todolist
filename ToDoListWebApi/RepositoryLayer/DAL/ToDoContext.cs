using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.DAL.EntityModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryLayer.DAL
{
    public class ToDoContext : IdentityDbContext<UserEntity>
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {
            
        }

        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<TagEntity> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TaskTag>().HasKey(tt => new { tt.TaskId, tt.TagId });
            builder.Entity<TaskTag>().HasOne(tt => tt.Task).WithMany(task => task.Tags).HasForeignKey(tt => tt.TaskId);
            builder.Entity<TaskTag>().HasOne(tt => tt.Tag).WithMany(tag => tag.Tasks).HasForeignKey(tt => tt.TagId);

            base.OnModelCreating(builder);
        }
    }
}
