import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services/firebase";
import { ROUTES } from "@/constants/routes";

const RegisterScreen = () => {
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
          createUserWithEmailAndPassword(
            auth,
            "divinovon@gmail.com",
            "Password123$"
          );
        }}
      >
        <Text>register</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.replace(ROUTES.logIn.getHref());
        }}
      >
        <Text>login</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
