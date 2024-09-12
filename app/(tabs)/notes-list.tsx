import { observer } from "mobx-react-lite";
import { FlatList, View } from "react-native";

import { useNotesStore } from "@/stores/NotesStore";
import NoteListItem from "@/components/NoteListItem";
import AddNoteButton from "@/components/AddNoteButton";

const NotesListScreen = () => {
  // hooks
  const { notes } = useNotesStore();

  // render
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "orange",
      }}
    >
      <FlatList
        data={[...notes]}
        renderItem={({ item, index }) => (
          <NoteListItem key={index} note={item} />
        )}
      />
      <AddNoteButton />
    </View>
  );
};

export default observer(NotesListScreen);
