import React, { FC } from "react";
import { gql, useMutation } from "@apollo/client";

import NoteListItem from "./NoteListItem";

import { Note, Notes } from "../../types/TNote";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(note: $note) {
      title
    }
  }
`;

type Props = {
  notes?: Notes;
  onNoteSelect(note?: Note): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: '10px'
    },
    center: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }),
);

const NoteList: FC<Props> = ({ notes, onNoteSelect }) => {

  const classes = useStyles();

  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: ["GetNotes"],
  });

  const addNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    createNote({
      variables: { note: { title: "New note", text: "" } },
    });
  };

  if (!notes?.length) {
    return <div>List of notes is empty</div>;
  }

  return (
    <Box>
      <Typography variant="h6" className={classes.title}>
        List of Notes
        </Typography>
      <List>
        {notes.map((note) => {
          return <NoteListItem key={note.id} note={note} onNoteSelect={onNoteSelect} />;
        })}
        <Divider />
        <ListItem>
          <IconButton edge="end" aria-label="save" onClick={addNote} className={classes.center}>
            <AddIcon />
          </IconButton>
        </ListItem>
      </List>
    </Box >
  );
};

export default NoteList;
