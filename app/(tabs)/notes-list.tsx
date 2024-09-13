import { useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { observer } from "mobx-react-lite";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/theme";
import { ROUTES } from "@/constants/routes";
import Typography from "@/components/Typography";
import NoteListItem from "@/components/NoteListItem";
import AddNoteButton from "@/components/AddNoteButton";
import { INote, ISortNote, useNotesStore } from "@/stores/NotesStore";

const NotesListScreen = () => {
  // hooks
  const { getSortNotes } = useNotesStore();
  const router = useRouter();

  // states
  const [sort, setSort] = useState<ISortNote>("mostRecent");

  // handlers
  const onToggleSort = () => {
    setSort((prev) => {
      if (prev === "mostOldest") return "mostRecent";
      return "mostOldest";
    });
  };

  const onPressNote = (note: INote) => {
    router.push(ROUTES.noteDetails.getHref({ noteId: note.id }));
  };

  // render
  const notes = getSortNotes(sort);

  return (
    <View style={styles.root}>
      {notes.length > 0 ? (
        <Fragment>
          <TouchableOpacity onPress={onToggleSort} style={styles.sortPressable}>
            <Ionicons
              name={sort == "mostRecent" ? "arrow-down" : "arrow-up"}
              style={styles.sortIcon}
            />
            <Typography
              variant="bodySmall"
              text={sort === "mostRecent" ? "Most recent" : "Most oldest"}
              customStyle={styles.sortText}
            />
          </TouchableOpacity>
          <FlatList
            data={[...notes]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <NoteListItem key={index} note={item} onPress={onPressNote} />
            )}
          />
        </Fragment>
      ) : (
        <View style={styles.emptyContainer}>
          <Typography
            variant={"body"}
            text={
              "Uh oh! Try adding a new note by clicking the 'Add note' button."
            }
            customStyle={styles.emptyText}
          />
        </View>
      )}

      <AddNoteButton />
    </View>
  );
};

export default observer(NotesListScreen);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 20,
  },
  sortPressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sortIcon: {
    color: COLORS.black,
    fontSize: 14,
  },
  sortText: {
    fontWeight: "bold",
    color: COLORS.black,
  },
  emptyContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
  },
});
