import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import { COLORS } from "@/constants/theme";
import Typography from "@/components/Typography";
import { useUserStore } from "@/stores/UserStore";
import { observer } from "mobx-react-lite";

const WelcomeScreen = () => {
  // hooks
  const router = useRouter();
  const { user } = useUserStore();

  // handlers
  const onClose = () => {
    router.back();
  };

  // render
  if (!user) return;
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Typography
          variant={"screenTitle"}
          text={`Hello, ${user.displayName}!`}
        />
        <Typography
          variant={"body"}
          text={
            "Welcome to this app! You will enjoy creating notes whether in list or map views."
          }
        />
        <Button label={"Close"} variant={"contained"} onPress={onClose} />
      </View>
    </View>
  );
};

export default observer(WelcomeScreen);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.overlay,
  },
  container: {
    maxWidth: "75%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
});
