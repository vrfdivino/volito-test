import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { Pressable, Text } from "react-native";

const LogOutButton = () => {
  //handlers
  const onLogout = async () => {
    await signOut(auth);
  };

  // render
  return (
    <Pressable onPress={onLogout}>
      <Text>Logout</Text>
    </Pressable>
  );
};

export default LogOutButton;
