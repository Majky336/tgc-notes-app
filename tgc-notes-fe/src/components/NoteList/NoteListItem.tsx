import React, { FC } from "react";

import { Note } from "../../types/TNote";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import {
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';

type Props = {
  note: Note;
  onNoteSelect(note: Note): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    limited: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }),
);

const NoteListItem: FC<Props> = ({ note, onNoteSelect }) => {

  const classes = useStyles();

  const handleChangeDisplayedNote = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    onNoteSelect(note)
  };

  return (
    <div>
      <Divider />
      <ListItem onClick={handleChangeDisplayedNote}>
        <ListItemText
          primary={note.title}
          secondary={note.text}
          classes={{ secondary: classes.limited }}
        />
      </ListItem>
    </div>
  );
};

export default NoteListItem;
