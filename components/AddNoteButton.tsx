import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "@/constants/theme";
import Typography from "@/components/Typography";

const AddNoteButton = () => {
  // hooks
  const router = useRouter();

  // handlers
  const onPress = () => {
    router.push("/note-details");
  };

  // render
  return (
    <TouchableOpacity style={styles.pressable} onPress={onPress}>
      <Ionicons name="add" style={styles.icon} />
      <Typography
        variant="bodySmall"
        text="Add note"
        customStyle={styles.text}
      />
    </TouchableOpacity>
  );
};

export default AddNoteButton;

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 14,
    color: COLORS.white,
  },
});
