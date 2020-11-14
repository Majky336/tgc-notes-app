using System.Collections.Generic;
using tgc_notes_be.Common;
using tgc_notes_be.Database;

namespace tgc_notes_be.Notes
{
    public class NotePayloadBase : Payload
    {
        protected NotePayloadBase(Note note)
        {
            Note = note;
        }

        protected NotePayloadBase(IReadOnlyList<UserError> errors) : base(errors)
        { }

        public Note Note { get; }
    }
}
