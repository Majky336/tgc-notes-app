using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace tgc_notes_be.Database
{
    public class Workbook
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public Note[] Notes { get; set; }
    }
}
