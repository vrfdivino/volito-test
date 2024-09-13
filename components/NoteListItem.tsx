import { DateTime } from "luxon";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/theme";
import { INote } from "@/stores/NotesStore";
import Typography from "@/components/Typography";

type NoteListItemProps = {
  note: INote;
  onPress: (note: INote) => void;
};

const NoteListItem = ({ note, onPress }: NoteListItemProps) => {
  // render
  return (
    <Pressable onPress={() => onPress(note)} style={styles.pressable}>
      {note.image && (
        <Image source={{ uri: note.image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Typography
            variant={"body"}
            text={note.title}
            customStyle={styles.title}
          />
          <Typography
            variant={"bodySmall"}
            text={DateTime.fromISO(note.dateCreated).toFormat("DD")}
            customStyle={styles.date}
          />
        </View>
        <Typography variant={"bodySmall"} text={note.body} />
      </View>
    </Pressable>
  );
};

export default observer(NoteListItem);

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    maxHeight: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  date: {
    color: COLORS.black,
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 10,
  },
});
