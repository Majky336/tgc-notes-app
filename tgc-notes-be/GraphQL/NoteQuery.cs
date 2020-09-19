using System.Linq;
using tgc_notes_be.Database;
using GraphQL.Types;
using GraphQL;

namespace tgc_notes_be.GraphQL
{
    public class NoteQuery : ObjectGraphType
    {
        public NoteQuery(ApplicationDbContext db)
        {
            Field<NoteType>(
              "Note",
              arguments: new QueryArguments(
                new QueryArgument<IdGraphType> { Name = "id", Description = "The ID of the Note." }),
              resolve: context =>
              {
                  var id = context.GetArgument<string>("id");
                  var note = db
              .Notes
              .FirstOrDefault(i => i.Id == id);
                  return note;
              });

            Field<ListGraphType<NoteType>>(
              "Notes",
              resolve: context =>
              {
                  var notes = db.Notes;
                  return notes;
              });
        }
    }
}
