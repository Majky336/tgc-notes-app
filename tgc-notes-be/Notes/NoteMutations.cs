using ConferencePlanner.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using System.Threading.Tasks;
using tgc_notes_be.Database;

namespace tgc_notes_be.Notes
{
    [ExtendObjectType(Name = "Mutation")]
    public class NoteMutations
    {
        [UseApplicationDbContext]
        public async Task<AddNotePayload> AddNoteAsync(
            AddNoteInput input,
            [ScopedService] ApplicationDbContext context)
        {
            var note = new Note
            {
                Title = input.Title,
                Text = input.Text,
            };

            context.Notes.Add(note);
            await context.SaveChangesAsync();

            return new AddNotePayload(note);
        }

        [UseApplicationDbContext]
        public async Task<RemoveNotePayload> RemoveNoteAsync(
            RemoveNoteInput input,
            [ScopedService] ApplicationDbContext context)
        {

            var note = new Note
            {
                Id = input.Id,
            };

            context.Notes.Remove(note);
            await context.SaveChangesAsync();

            return new RemoveNotePayload(note);
        }

        [UseApplicationDbContext]
        public async Task<UpdateNotePayload> UpdateNoteAsync(
            UpdateNoteInput input,
            [ScopedService] ApplicationDbContext context)
        {

            var note = new Note
            {
                Id = input.Id,
                Title = input.Title,
                Text = input.Text,
            };

            context.Notes.Update(note);
            await context.SaveChangesAsync();

            return new UpdateNotePayload(note);
        }
    }
}
