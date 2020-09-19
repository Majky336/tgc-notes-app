using GraphQL.Types;
using tgc_notes_be.Database;

namespace tgc_notes_be.GraphQL {
    public class NoteType : ObjectGraphType<Note> {
        public NoteType () {
            Name = "Note";

            Field (x => x.Id, type : typeof (IdGraphType)).Description ("Note's ID.");
            Field (x => x.Title).Description ("Title for the Note.");
            Field (x => x.Text).Description ("Text of the Note.");
        }
    }
}