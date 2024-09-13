import { signOut } from "firebase/auth";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/constants/theme";
import { auth } from "@/services/firebase";

const LogOutButton = () => {
  //handlers
  const onLogout = async () => {
    await signOut(auth);
  };

  // render
  return (
    <TouchableOpacity onPress={onLogout} style={styles.pressable}>
      <Ionicons name="log-out" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default LogOutButton;

const styles = StyleSheet.create({
  pressable: {
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    fontSize: 20,
    color: COLORS.black,
  },
});
