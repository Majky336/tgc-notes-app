import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";

import Page from "../components/Page/Page";
import { Note, NotesResponse } from "../types/TNote";
import NoteList from "../components/NoteList/NoteList";
import NoteDetail from "../components/NoteDetail/NoteDetail";
import { Box, Divider } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

export const NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      text
    }
  }
`;

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    box: {
      height: "100vh",
      display: "flex",
    },
    noteList: {
      maxWidth: "30%",
      overflowY: "auto",
    },
    noteDetail: {
      width: "65%",
    },
  })
);

const HomePage = (_: RouteComponentProps) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<NotesResponse>(NOTES);

  const [displayedNote, setDisplayedNote] = useState<Note>();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>An error has occured.</div>;
  }

  const notes = data?.notes;

  const onNoteSelect = (note?: Note) => {
    setDisplayedNote(note);
  };

  return (
    <Page>
      <Box className={classes.box}>
        <Box className={classes.noteList}>
          <NoteList notes={notes} onNoteSelect={onNoteSelect} />
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box className={classes.noteDetail}>
          <NoteDetail
            notes={notes}
            note={displayedNote}
            onNoteSelect={onNoteSelect}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
