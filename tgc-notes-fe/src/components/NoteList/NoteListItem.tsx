import React, { FC } from "react";

import styles from "./NoteListItem.module.scss";

import { Note } from "../../types/TNote";

type Props = {
  note: Note;
};

const NoteListItem: FC<Props> = ({ note }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{note.title}</div>
      <div className={styles.text}>{note.text}</div>
    </div>
  );
};

export default NoteListItem;
