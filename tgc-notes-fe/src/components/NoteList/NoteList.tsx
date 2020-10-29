import React, { FC } from "react";

import NoteListItem from "./NoteListItem";
import styles from "./NoteList.module.scss";

import { Notes } from "../../types/TNote";

type Props = {
  notes?: Notes;
};

const NoteList: FC<Props> = ({ notes }) => {
  if (!notes?.length) {
    return <div>List of notes is empty</div>;
  }

  return (
    <div className={styles.wrapper}>
      {notes.map((note) => {
        return <NoteListItem key={note.id} note={note} />;
      })}
    </div>
  );
};

export default NoteList;
