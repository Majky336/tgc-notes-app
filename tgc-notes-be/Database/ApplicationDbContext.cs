using Microsoft.EntityFrameworkCore;

namespace tgc_notes_be.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<Note> Notes { get; set; }

        public DbSet<Workbook> Workbooks { get; set; }
    }
}
