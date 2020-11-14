using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

using HotChocolate;
using HotChocolate.AspNetCore;
using tgc_notes_be.Database;
using tgc_notes_be.Notes;
using tgc_notes_be.Workbooks;

namespace tgc_notes_be
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("AllowAllCors", builder =>
             {
                 builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
             }));

            services.AddDbContextPool<ApplicationDbContext>(context =>
            {
                context.UseInMemoryDatabase("GraphQL");
            });

            services
                .AddGraphQL(s => SchemaBuilder
                    .New()
                    .AddServices(s)
                    .AddQueryType(d => d.Name("Query"))
                        .AddType<NoteQueries>()
                        .AddType<WorkbookQueries>()
                    .AddMutationType(d => d.Name("Mutation"))
                        .AddType<WorkbookMutations>()
                        .AddType<NoteMutations>()
                    .Create()
                );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowAllCors");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseWebSockets();
            app.UseGraphQL();
            app.UseGraphiQL();
            app.UsePlayground();
        }
    }
}
