using System.Collections.Generic;
using tgc_notes_be.Common;
using tgc_notes_be.Database;

namespace tgc_notes_be.Notes
{
    public class AddNotePayload : NotePayloadBase
    {
        public AddNotePayload(Note note) : base(note) { }

        public AddNotePayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
