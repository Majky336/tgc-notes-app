using System;
using System.Diagnostics;
using System.Linq;
using GraphQL;
using GraphQL.Types;
using tgc_notes_be.Database;
using tgc_notes_be.GraphQL;

public class NoteMutation : ObjectGraphType {
    public NoteMutation (ApplicationDbContext db) {

        Field<NoteType> (
            "createNote",
            arguments : new QueryArguments (
                new QueryArgument<NonNullGraphType<NoteInputType>> { Name = "Note", Description = "Note object for new note" }),
            resolve : context => {
                var noteToCreate = context.GetArgument<Note> ("note");
                noteToCreate.Id = Guid.NewGuid ().ToString ();

                db.Notes.Add (noteToCreate);
                db.SaveChanges ();

                return noteToCreate;
            });

        Field<NoteType> (
            "deleteNote",
            arguments : new QueryArguments (
                new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "Id", Description = "Id of note to be deleted" }),
            resolve : context => {
                var id = context.GetArgument<string> ("id");

                var noteToDelete = db.Notes.Single (Note => Note.Id == id);

                db.Notes.Remove (noteToDelete);
                db.SaveChanges ();

                return noteToDelete;
            });

        Field<NoteType> (
            "updateNote",
            arguments : new QueryArguments (
                new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "Id", Description = "Id of note to be updated" },
                new QueryArgument<NonNullGraphType<NoteInputType>> { Name = "Note", Description = "Note object to replace the original note properties" }
            ),
            resolve : context => {
                var id = context.GetArgument<string> ("id");
                var note = context.GetArgument<Note> ("note");

                var noteToUpdate = db.Notes.Single (Note => Note.Id == id);

                if (noteToUpdate == null) {
                    context.Errors.Add (new ExecutionError ("Couldn't find note in db."));
                    return null;
                }

                noteToUpdate.Title = note.Title;

                if (note?.Text != null) {
                    noteToUpdate.Text = note.Text;
                }

                return noteToUpdate;
            });
    }
}