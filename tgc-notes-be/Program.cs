using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using tgc_notes_be.Database;

namespace tgc_notes_be
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();
            using (IServiceScope scope = host.Services.CreateScope())
            {
                ApplicationDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                context.Notes.Add(
                    new Note
                    {
                        Title = "Some kind of title",
                        Text = "This is something very important"
                    }
                );

                context.Workbooks.Add(
                    new Database.Workbook { Name = "My first notebook", Description = "GG WP Go next", CreatedAt = new System.DateTime() });

                context.SaveChanges();
            }
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
    }
}