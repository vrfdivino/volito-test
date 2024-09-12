import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const WelcomeScreen = () => {
  // hooks
  const router = useRouter();

  // handlers
  const onClose = () => {
    router.back();
  };

  // render
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View
        style={{
          height: "35%",
          width: "75%",
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={onClose}>
          <Text>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;
