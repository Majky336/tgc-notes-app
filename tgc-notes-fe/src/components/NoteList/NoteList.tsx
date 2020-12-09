import React, { FC } from "react";
import { gql, useMutation } from "@apollo/client";

import NoteListItem from "./NoteListItem";

import { Note } from "../../types/TNote";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(note: $note) {
      title
    }
  }
`;

type Props = {
  notes?: Note[];
  onNoteSelect(note?: Note): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    title: {
      marginLeft: "10px",
    },
  })
);

const NoteList: FC<Props> = ({ notes, onNoteSelect }) => {
  const classes = useStyles();

  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: ["GetNotes"],
  });

  const addNote = (_: React.MouseEvent<HTMLButtonElement>) => {
    createNote({
      variables: { note: { title: "New note", text: "" } },
    });
  };

  const renderNotes = () => {
    if (!notes?.length) {
      return <div>List of notes is empty</div>;
    }

    return notes.map((note) => {
      return (
        <NoteListItem key={note.id} note={note} onNoteSelect={onNoteSelect} />
      );
    });
  };

  return (
    <Box>
      <Typography variant="h6" className={classes.title}>
        List of Notes
      </Typography>
      <List>
        {renderNotes()}
        <Divider />
        <ListItem>
          <IconButton
            edge="end"
            aria-label="save"
            onClick={addNote}
            className={classes.center}
          >
            <AddIcon />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default NoteList;
