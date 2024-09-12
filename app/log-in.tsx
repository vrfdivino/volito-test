import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services/firebase";
import { ROUTES } from "@/constants/routes";

const LogInScreen = () => {
  const router = useRouter();

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
      <Pressable
        onPress={() => {
          router.replace(ROUTES.register.getHref());
        }}
      >
        <Text>New here?</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;
