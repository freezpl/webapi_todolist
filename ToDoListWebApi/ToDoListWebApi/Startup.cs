using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RepositoryLayer;
using RepositoryLayer.DAL;
using RepositoryLayer.DAL.EntityModels;
using RepositoryLayer.Interfaces;
using ToDoListWebApi.Helpers;

namespace ToDoListWebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            string connectionStr = Configuration.GetConnectionString("SQLConnection");
            services.AddDbContext<ToDoContext>(options => options.UseSqlServer(connectionStr));

            services.AddScoped<IRepository, SQLRepository>(_serviveProvider =>
                    new SQLRepository(_serviveProvider.GetService<ToDoContext>(), _serviveProvider.GetService<UserManager<UserEntity>>())
                );

            services.AddScoped(s=>new AuthOptions(Configuration));

            services.AddIdentity<UserEntity, IdentityRole>(opts =>
            {
                opts.Password.RequiredLength = 4;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = false;
            })
                   .AddEntityFrameworkStores<ToDoContext>()
                   //.AddUserManager<AppUserManager>()
                   .AddDefaultTokenProviders();


           ServiceProvider serviceProvider = services.BuildServiceProvider();
            services.AddAuthentication(cfg =>
            {
                cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                cfg.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidIssuer = Configuration.GetValue<string>("JwtOptions:issuer"),
                            ValidAudience = Configuration.GetValue<string>("JwtOptions:audience"),
                            ValidateLifetime = Configuration.GetValue<bool>("JwtOptions:validateLifetime"),
                            IssuerSigningKey = serviceProvider.GetService<AuthOptions>().GetKey(),
                        };
                    });

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

       public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseMvc();

            StartupHelper.EnshurePopulated(app);
        }
    }
}
