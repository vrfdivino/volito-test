import { INote } from "@/stores/NotesStore";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";

type NoteListItemProps = {
  note: INote;
};

const NoteListItem = ({ note }: NoteListItemProps) => {
  const router = useRouter();

  const onPress = () => {
    router.push(`/note-details?q=${note.id}`);
  };

  return (
    <Pressable onPress={onPress}>
      <Text>{note.title}</Text>
      <Text>{note.body}</Text>
    </Pressable>
  );
};

export default observer(NoteListItem);
