import { useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import MapView, { Marker } from "react-native-maps";

import { COLORS } from "@/constants/theme";
import { ROUTES } from "@/constants/routes";
import Typography from "@/components/Typography";
import NoteListItem from "@/components/NoteListItem";
import AddNoteButton from "@/components/AddNoteButton";
import { INote, useNotesStore } from "@/stores/NotesStore";

const NotesMapScreen = () => {
  // hooks
  const { notesByLocation } = useNotesStore();
  const [selectedNotes, setSelectedNotes] = useState<INote[]>([]);
  const router = useRouter();

  // handlers
  const onPressMarker = (notes: INote[]) => {
    setSelectedNotes(notes);
  };

  const onPressNote = (note: INote) => {
    setSelectedNotes([]);
    router.push(ROUTES.noteDetails.getHref({ noteId: note.id }));
  };

  // render
  return (
    <View style={styles.root}>
      <Modal visible={selectedNotes.length > 0} animationType="fade">
        <SafeAreaView>
          <FlatList
            data={selectedNotes}
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={() => {
              return (
                <View style={styles.flatListHeader}>
                  <Typography
                    variant={"body"}
                    text={"Select note"}
                    customStyle={styles.flatListHeaderText}
                  />
                </View>
              );
            }}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
              <NoteListItem key={item.id} note={item} onPress={onPressNote} />
            )}
          />
        </SafeAreaView>
      </Modal>
      <MapView style={styles.map}>
        {Object.entries(notesByLocation).map(([location, notes], _) => (
          <Marker
            key={location}
            coordinate={{ ...notes[0].location }}
            onPress={() => onPressMarker(notes)}
          />
        ))}
      </MapView>
      <AddNoteButton />
    </View>
  );
};

export default observer(NotesMapScreen);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },
  flatList: {
    height: "100%",
    padding: 20,
    gap: 10,
  },
  flatListHeader: {
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },
  flatListHeaderText: {
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});
