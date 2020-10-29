import React from "react";
import { RouteComponentProps } from "@reach/router";

import Page from "../components/Page/Page";
import { gql, useQuery } from "@apollo/client";
import { NotesReponse } from "../types/TNote";
import Loader from "../components/Loader/Loader";
import NoteList from "../components/NoteList/NoteList";
import AddNoteForm from "../components/AddNoteForm/AddNoteForm";

const NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      text
    }
  }
`;

const HomePage = (props: RouteComponentProps) => {
  const { loading, error, data } = useQuery<NotesReponse>(NOTES);

  console.log('Loading in home page', loading)
  console.log('Notes in home page', data?.notes)

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Dakde ti to padlo</div>;
  }

  return (
    <Page>
      <div>Welcome to homepage</div>
      <AddNoteForm />
      <NoteList notes={data?.notes} />
    </Page>
  );
};

export default HomePage;
