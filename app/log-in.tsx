import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Pressable, Text, View } from "react-native";

const LogInScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => {
          signInWithEmailAndPassword(
            auth,
            "vrfdivino@gmail.com",
            "Password123$"
          );
        }}
      >
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;
