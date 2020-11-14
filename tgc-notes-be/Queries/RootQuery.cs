using ConferencePlanner.GraphQL;
using HotChocolate;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using tgc_notes_be.Database;

namespace tgc_notes_be.Queries
{
    public class RootQuery
    {
        [UseApplicationDbContext]
        public Task<List<Note>> GetNotes([ScopedService] ApplicationDbContext context) => context.Notes.ToListAsync();
    }
}
