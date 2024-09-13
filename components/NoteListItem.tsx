import { DateTime } from "luxon";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/theme";
import { INote } from "@/stores/NotesStore";
import { ROUTES } from "@/constants/routes";
import Typography from "@/components/Typography";

type NoteListItemProps = {
  note: INote;
};

const NoteListItem = ({ note }: NoteListItemProps) => {
  // hooks
  const router = useRouter();

  // handlers
  const onPress = () => {
    router.push(ROUTES.noteDetails.getHref({ noteId: note.id }));
  };

  // render
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
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
});
