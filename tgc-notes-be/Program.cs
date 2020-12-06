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

                context.Notes.Add(
                    new Note
                    {
                        Title = "Northwest Passage",
                        Text = @"Ah, for just one time I would take the Northwest Passage
To find the hand of Franklin reaching for the Beaufort Sea
Tracing one warm line through a land so wide and savage
And make a Northwest Passage to the sea"
                    }
                );

                context.Notes.Add(
                    new Note
                    {
                        Title = "Soulbound",
                        Text = @"We race around the melted char of what was once a neutron star
And use the gravity to whip us into dark galactic rifts
Yet still somehow we can't escape, they have no flaw, they feel no pain
These twisted shadows of the men I once condemned"
                    }
                );

                context.SaveChanges();
            }
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
    }
}