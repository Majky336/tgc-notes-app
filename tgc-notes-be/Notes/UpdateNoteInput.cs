using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tgc_notes_be.Notes
{
    public class UpdateNoteInput
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
