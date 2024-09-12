import { applySnapshot, SnapshotOut, types } from "mobx-state-tree";

const NoteLocation = types.model({
  latitude: types.number,
  longitude: types.number,
});

const Note = types.model({
  id: types.identifier,
  title: types.string,
  body: types.string,
  userId: types.string,
  location: NoteLocation,
});

const NotesStore = types
  .model({
    loading: types.boolean,
    notes: types.array(Note),
  })
  .actions((self) => ({
    init: (notes: INote[]) => {
      applySnapshot(self.notes, notes);
    },
  }));

const notesStore = NotesStore.create({
  loading: false,
  notes: [],
});

export const useNotesStore = () => notesStore;
export type INote = SnapshotOut<typeof Note>;
