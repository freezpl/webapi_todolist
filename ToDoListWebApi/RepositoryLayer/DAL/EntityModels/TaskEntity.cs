using RepositoryLayer.DAL.EntityModels.BaseEntityes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RepositoryLayer.DAL.EntityModels
{
    public class TaskEntity : BaseEntity
    {
        [Required]
        public string Description { get; set; }

        [Range(0,5)]
        public int Priority { get; set; }
        public DateTime Date { get; set; }

        [Required]
        public CategoryEntity Category { get; set; }

        public List<TaskTag> Tags { get; set; }

        [Required]
        public UserEntity User { get; set; }
    }
}
