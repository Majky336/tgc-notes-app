import React, { ChangeEvent, FC, useState } from "react";

import styles from "./NoteListItem.module.scss";

import { Note } from "../../types/TNote";

import { gql, useMutation } from "@apollo/client";

type Props = {
  note: Note;
};


const NoteListItem: FC<Props> = ({ note }) => {

  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.text);
  const [beingEdited, setEditingState] = useState(false);

  const handeNoteTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handeNoteTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleStartEditing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditingState(true);
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

  const [deleteNodeMutation] = useMutation(DELETE_NOTE, { refetchQueries: ['GetNotes'] });

  const [updateNoteMutation] = useMutation(UPDATE_NOTE, { refetchQueries: ['GetNotes'] });

  const removeNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteNodeMutation({ variables: { id: note.id } });
  };

  const updateNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    updateNoteMutation({ variables: { id: note.id, note: { title: noteTitle, text: noteText } } });
    setEditingState(false);
  };

  if (beingEdited) {
    return (<div className={styles.wrapper}>
      <input type="text" value={noteTitle} className={styles.title} onChange={handeNoteTitleChange} />
      <input type="text" value={noteText} className={styles.text} onChange={handeNoteTextChange} />
      <button onClick={removeNote}>Delete this</button>
      <button onClick={updateNote}>Update this</button>
    </div>
    )
  } else {
    return (<div className={styles.wrapper}>
      <div className={styles.title} onClick={handleStartEditing}>{note.title}</div>
      <div className={styles.text} onClick={handleStartEditing}>{note.text}</div>
      <button onClick={removeNote}>Delete this</button>
    </div>)
  };



};

export default NoteListItem;
