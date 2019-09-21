using RepositoryLayer.DAL.EntityModels.BaseEntityes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RepositoryLayer.DAL.EntityModels
{
    public class TagEntity : NamedEntity
    {
        [Required]
        [MaxLength(20)]
        public string Color { get; set; }

        public ICollection<TaskTag> Tasks { get; set; }
    }
}
