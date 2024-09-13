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
  dateCreated: types.string,
  image: types.maybe(types.string),
  imageName: types.maybe(types.string),
});

const NotesStore = types
  .model({
    loading: types.boolean,
    notes: types.array(Note),
  })
  .actions((self) => ({
    init: (notes: INote[]) => {
      self.loading = true;
      applySnapshot(self.notes, notes);
      self.loading = false;
    },
  }))
  .views((self) => ({
    getNoteById(id: string) {
      return self.notes.find((note) => note.id === id);
    },
    getSortNotes(sort: ISortNote) {
      return self.notes.slice().sort((a, b) => {
        if (sort === "mostOldest") {
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
        }
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      });
    },
    get notesByLocation() {
      const notes: Record<string, INote[]> = {};
      self.notes.forEach((note) => {
        const noteLocationKey = `${note.location.latitude}-${note.location.longitude}`;
        if (noteLocationKey in notes) {
          notes[noteLocationKey].push(note);
        } else {
          notes[noteLocationKey] = [note];
        }
      });
      return notes;
    },
  }));

const notesStore = NotesStore.create({
  loading: false,
  notes: [],
});

export const useNotesStore = () => notesStore;
export type INote = SnapshotOut<typeof Note>;
export type ISortNote = "mostRecent" | "mostOldest";
