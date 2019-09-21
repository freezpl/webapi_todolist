using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace DtoModels
{
    [DataContract]
    public class TagDto
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }
    }
}