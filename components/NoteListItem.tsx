import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, Text } from "react-native";

import { INote } from "@/stores/NotesStore";
import { ROUTES } from "@/constants/routes";

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
    <Pressable onPress={onPress}>
      <Text>{note.title}</Text>
      <Text>{note.body}</Text>
    </Pressable>
  );
};

export default observer(NoteListItem);
