using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tgc_notes_be.Common;
using tgc_notes_be.Database;

namespace tgc_notes_be.Notes
{
    public class RemoveNotePayload : NotePayloadBase
    {
        public RemoveNotePayload(Note note) : base(note) { }
        public RemoveNotePayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
