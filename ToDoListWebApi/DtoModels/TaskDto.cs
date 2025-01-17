﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace DtoModels
{
    [DataContract]
    public class TaskDto
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "priority")]
        public int Priority { get; set; }

        [DataMember(Name = "date")]
        public DateTime Date { get; set; }

        [DataMember(Name = "category")]
        public CategoryDto Category { get; set; }

        [DataMember(Name = "tags")]
        public List<TagDto> Tags { get; set; }

        [DataMember(Name = "userId")]
        public string UserId { get; set; }
    }
}