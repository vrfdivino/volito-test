import { useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import MapView, { Marker } from "react-native-maps";

import Button from "@/components/Button";
import { COLORS } from "@/constants/theme";
import { ROUTES } from "@/constants/routes";
import Typography from "@/components/Typography";
import { useUserStore } from "@/stores/UserStore";
import NoteListItem from "@/components/NoteListItem";
import AddNoteButton from "@/components/AddNoteButton";
import { INote, useNotesStore } from "@/stores/NotesStore";

const NotesMapScreen = () => {
  // hooks
  const { location } = useUserStore();
  const { notesByLocation } = useNotesStore();
  const [selectedNotes, setSelectedNotes] = useState<INote[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  // handlers
  const onPressMarker = (notes: INote[]) => {
    setShowModal(true);
    setSelectedNotes(notes);
  };

  const onPressNote = (note: INote) => {
    setShowModal(false);
    router.push(ROUTES.noteDetails.getHref({ noteId: note.id }));
    setTimeout(() => {
      setSelectedNotes([]);
    }, 1000);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedNotes([]);
    }, 1000);
  };

  // render
  if (!location) return null;
  return (
    <View style={styles.root}>
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView>
          <FlatList
            showsVerticalScrollIndicator={false}
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
            ListFooterComponent={() => (
              <Button
                label={"Close"}
                variant={"contained"}
                onPress={onCloseModal}
              />
            )}
            renderItem={({ item }) => (
              <NoteListItem key={item.id} note={item} onPress={onPressNote} />
            )}
          />
        </SafeAreaView>
      </Modal>
      <MapView
        style={styles.map}
        region={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      >
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
