using ConferencePlanner.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tgc_notes_be.Database;

namespace tgc_notes_be.Notes
{
    [ExtendObjectType(Name = "Query")]
    public class NoteQueries
    {
        [UseApplicationDbContext]
        public Task<List<Note>> GetNotes([ScopedService] ApplicationDbContext context) => context.Notes.ToListAsync();

        [UseApplicationDbContext]
        public Note GetNote(string id, [ScopedService] ApplicationDbContext context)
        {
            var note = context.Notes.FirstOrDefault(e => e.Id == id);

            return note;
        }
    }
}
