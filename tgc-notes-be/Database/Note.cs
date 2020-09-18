using System.ComponentModel.DataAnnotations.Schema;

namespace tgc_notes_be.Database
{
    public class Note
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}