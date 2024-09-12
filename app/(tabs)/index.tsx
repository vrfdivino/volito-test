import { useNotesStore } from "@/stores/NotesStore";
import { observer } from "mobx-react-lite";
import { Text, View } from "react-native";

const NotesListScreen = () => {
  const { notes } = useNotesStore();
  return (
    <View>
      <Text>{JSON.stringify(notes)}</Text>
    </View>
  );
};

export default observer(NotesListScreen);
