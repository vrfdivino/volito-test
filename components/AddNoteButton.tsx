import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

const AddNoteButton = () => {
  // hooks
  const router = useRouter();

  // handlers
  const onPress = () => {
    router.push("/note-details");
  };

  // render
  return (
    <Pressable
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 999,
      }}
      onPress={onPress}
    >
      <Text>+ Add note</Text>
    </Pressable>
  );
};

export default AddNoteButton;
