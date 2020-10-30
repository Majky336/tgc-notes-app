import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { gql, useMutation } from "@apollo/client";
import { Note } from "../../types/TNote";

import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  note?: Note;
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
      fontSize: 40
    },
    title: {
      marginLeft: '10px',
      marginTop: '7px'
    },
    text: {
      marginLeft: '10px',
      marginTop: '20px'
    },
    iconBar: {
      position: "absolute",
      top: "30px"
    }
  }),
);

const DisplayedNote: FC<Props> = ({ note }) => {

  const classes = useStyles();

  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteText, setNoteText] = useState(note?.text || "");

  const [deleteNodeMutation] = useMutation(DELETE_NOTE, { refetchQueries: ['GetNotes'] });
  const [updateNoteMutation] = useMutation(UPDATE_NOTE, { refetchQueries: ['GetNotes'] });

  const handeNoteTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handeNoteTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const removeNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (note != null) {
      deleteNodeMutation({ variables: { id: note.id } });
    }
  };

  const updateNote = () => {
    if (note != null) {
      updateNoteMutation({ variables: { id: note.id, note: { title: noteTitle, text: noteText } } });
    }
  };

  useEffect(() => {
    setNoteTitle(note?.title || "")
    setNoteText(note?.text || "")
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
    )
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Pick a note from the list
        </Typography>
    </div >
  )
};

export default DisplayedNote;
