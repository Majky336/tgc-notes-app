using GraphQL.Types;

public class NoteInputType : InputObjectGraphType<NoteInputType> {
    public NoteInputType () {
        Name = "NoteInput";

        Field<NonNullGraphType<StringGraphType>> ("Title");
        Field<StringGraphType> ("Text");
    }
}