import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from "./AddNoteForm.module.scss";

const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(note: $note) {
      title
    }
  }
`;

//TODO - try react-hook-form instaed of this
const AddNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: ["GetNotes"],
  });

  const resetFields = () => {
    setNoteTitle("");
    setNoteText("");
  };

  const handeNoteTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handeNoteTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createNote({
      variables: { note: { title: noteTitle, text: noteText } },
    });

    resetFields();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <label htmlFor="noteTitle">Title</label>
      <input
        className={styles["form-item"]}
        type="text"
        onChange={handeNoteTitleChange}
        value={noteTitle}
        id="noteTitle"
      />

      <label htmlFor="noteText">Text of the note</label>
      <input
        className={styles["form-item"]}
        type="text"
        onChange={handeNoteTextChange}
        value={noteText}
        id="noteText"
      />
      <button type="submit">Add new note</button>
    </form>
  );
};

export default AddNoteForm;
