import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from "@reach/router";

import Page from "../components/Page/Page";
import { gql, useQuery } from "@apollo/client";
import { Note, NotesReponse } from "../types/TNote";
import Loader from "../components/Loader/Loader";
import NoteList from "../components/NoteList/NoteList";
import DisplayedNote from "../components/NoteDetail/NoteDetail";
import {
  Box,
  Divider,
} from '@material-ui/core';

const NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      text
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      height: "100vh",
      display: "flex"
    },
    noteList: {
      maxWidth: "30%"
    },
    noteDetail: {
      width: "65%"
    }
  }),
);


const HomePage = (props: RouteComponentProps) => {

  const classes = useStyles();

  const { loading, error, data } = useQuery<NotesReponse>(NOTES);
  const [displayedNote, setDisplayedNote] = useState(data?.notes[0]);
  const [displayedIndex, setDisplayedIndex] = useState(displayedNote ? data?.notes.indexOf(displayedNote) : 0);

  useEffect(() => {
    if (data?.notes) {
      const targetNote = data.notes.find(note => displayedNote?.id === note.id);

      setDisplayedNote(targetNote)

      // select first note on first load
      if (displayedNote === undefined) {
        setDisplayedNote(data?.notes[0])
      }
    }
  }, [data?.notes])

  useEffect(() => {

    let tempIndex = displayedIndex

    if (data === undefined || tempIndex === undefined) {
      return
    }

    if (displayedNote === undefined) {
      if (tempIndex >= data.notes.length) {
        tempIndex = data.notes.length - 1
      }
    } else {
      tempIndex = data.notes.findIndex(note => displayedNote?.id === note.id)
    }

    setDisplayedNote(data?.notes[tempIndex])
    setDisplayedIndex(tempIndex)
  }, [displayedNote])

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>An error has occured.</div>;
  }

  const onNoteSelect = (note?: Note) => {
    setDisplayedNote(note)
  }

  return (
    <Page>
      <Box className={classes.box} >
        <Box className={classes.noteList}>
          <NoteList notes={data?.notes} onNoteSelect={onNoteSelect} />
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box className={classes.noteDetail}>
          <DisplayedNote note={displayedNote} />
        </Box>
      </Box>
    </Page >
  );
};

export default HomePage;
