import NoteListItem from "@/components/NoteListItem";
import { useNotesStore } from "@/stores/NotesStore";
import { observer } from "mobx-react-lite";
import { FlatList, View } from "react-native";

const NotesListScreen = () => {
  const { notes } = useNotesStore();

  // console.log({ notes });
  return (
    <View>
      <FlatList
        data={[...notes]}
        renderItem={({ item, index }) => (
          <NoteListItem key={index} note={item} />
        )}
      />
    </View>
  );
};

export default observer(NotesListScreen);
