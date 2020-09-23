export type NotesReponse = {
  notes: Notes;
};

export type Notes = Note[];

export type Note = {
  id: string;
  title: string;
  text?: string;
};
