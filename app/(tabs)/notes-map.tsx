import { useNotesStore } from "@/stores/NotesStore";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const NotesMapScreen = () => {
  const { notes } = useNotesStore();
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
    </View>
  );
};

export default observer(NotesMapScreen);
