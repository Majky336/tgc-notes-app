import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { Note, NotesResponse } from "../../types/TNote";

import DeleteIcon from "@material-ui/icons/Delete";
import { NOTES } from "../../pages/HomePage";

type Props = {
  note?: Note;
  notes?: Note[];
  onNoteSelect: (note?: Note) => void;
};

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $note: NoteInput!) {
    updateNote(id: $id, note: $note) {
      id
      title
      text
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resize: {
      fontSize: 40,
    },
    title: {
      marginLeft: "10px",
      marginTop: "7px",
    },
    text: {
      marginLeft: "10px",
      marginTop: "20px",
    },
    iconBar: {
      position: "absolute",
      top: "30px",
    },
  })
);

const NoteDetail: FC<Props> = ({ note, notes, onNoteSelect }) => {
  const classes = useStyles();

  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteText, setNoteText] = useState(note?.text || "");

  useEffect(() => {
    if (!note) {
      onNoteSelect(notes?.[0]);
    }
  }, []);

  const [deleteNodeMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: ["GetNotes"],
    onCompleted: ({ deleteNote }) => {
      const deletedNoteIndex =
        notes?.findIndex((noteObj) => noteObj.id === deleteNote.id) || 0;
      const displayedNoteIndex =
        deletedNoteIndex === 0 ? deletedNoteIndex + 1 : deletedNoteIndex - 1;

      onNoteSelect(notes?.[displayedNoteIndex]);
    },
  });
  const [updateNoteMutation] = useMutation(UPDATE_NOTE);

  const handeNoteTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handeNoteTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const removeNote = () => {
    if (note != null) {
      deleteNodeMutation({ variables: { id: note.id } });
    }
  };

  const updateNote = () => {
    if (note != null) {
      updateNoteMutation({
        variables: { id: note.id, note: { title: noteTitle, text: noteText } },
        update: (cache, { data }) => {
          const notesQuery = cache.readQuery<NotesResponse>({ query: NOTES });
          const updatedNote = data?.updateNote;

          const updatedNotes = notesQuery?.notes?.map((originalNote) =>
            originalNote.id === updatedNote.id ? updatedNote : originalNote
          );

          cache.writeQuery({ query: NOTES, data: { notes: updatedNotes } });
        },
      });
    }
  };

  useEffect(() => {
    setNoteTitle(note?.title || "");
    setNoteText(note?.text || "");
  }, [note]);

  if (note != null) {
    return (
      <div>
        <TextField
          label="Title"
          fullWidth
          value={noteTitle}
          onChange={handeNoteTitleChange}
          onBlur={updateNote}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          className={classes.title}
        />
        <TextField
          label="Text"
          multiline
          fullWidth
          value={noteText}
          onChange={handeNoteTextChange}
          onBlur={updateNote}
          variant="outlined"
          className={classes.text}
        />
        <ListItemSecondaryAction className={classes.iconBar}>
          <IconButton edge="end" aria-label="delete" onClick={removeNote}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Pick a note from the list
      </Typography>
    </div>
  );
};

export default NoteDetail;
