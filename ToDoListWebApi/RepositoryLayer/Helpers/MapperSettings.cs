using AutoMapper;
using DtoModels;
using RepositoryLayer.DAL.EntityModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryLayer.Helpers
{
    class MapperSettings : Profile
    {
        public MapperSettings()
        {
            CreateMap<TaskEntity, TaskDto>();
            CreateMap<TaskTag, TagDto>().ConvertUsing(tt =>
                new TagDto { Id = tt.Tag.Id, Color = tt.Tag.Color, Name = tt.Tag.Name }
            );

            CreateMap<CategoryEntity, CategoryDto>();
            CreateMap<TagEntity, TagDto>();



            //reverse
            CreateMap<TagDto, TagEntity>();
        }
    }
}
