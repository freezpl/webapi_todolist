using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryLayer.DAL.EntityModels
{
    public class TaskTag
    {
        public int TaskId { get; set; }
        public TaskEntity Task { get; set; }

        public int TagId { get; set; }
        public TagEntity Tag { get; set; }
    }
}
