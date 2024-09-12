import { View } from "react-native";
import { observer } from "mobx-react-lite";
import MapView, { Marker } from "react-native-maps";

import { useNotesStore } from "@/stores/NotesStore";
import AddNoteButton from "@/components/AddNoteButton";

const NotesMapScreen = () => {
  // hooks
  const { notes } = useNotesStore();

  // render
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <MapView style={{ flex: 1 }}>
        {notes.map((note) => (
          <Marker
            key={note.id}
            coordinate={{ ...note.location }}
            title={note.title}
            description={note.body}
          />
        ))}
      </MapView>
      <AddNoteButton />
    </View>
  );
};

export default observer(NotesMapScreen);
