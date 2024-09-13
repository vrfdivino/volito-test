import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { COLORS } from "@/constants/theme";
import { ROUTES } from "@/constants/routes";
import { TABLES } from "@/constants/tables";
import { auth, db } from "@/services/firebase";
import Typography from "@/components/Typography";
import { useUserStore } from "@/stores/UserStore";
import { INote, useNotesStore } from "@/stores/NotesStore";

const App = () => {
  // hooks
  const { init: initUser, loading, user } = useUserStore();
  const { init: initNotes } = useNotesStore();
  const router = useRouter();

  // effects
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        initUser(user);
      } else {
        router.replace(ROUTES.logIn.getHref());
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      query(collection(db, TABLES.notes), where("userId", "==", user.id)),
      ({ docs }) => {
        const notes: INote[] = [];
        docs.forEach((doc) => notes.push(doc.data() as unknown as INote));
        initNotes(notes);
      }
    );

    return () => {
      unsub();
    };
  }, [user]);

  const onBack = () => {
    router.back();
  };

  // render
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.noteDetails.getName()}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: (props) => (
            <View style={styles.backContainer}>
              <TouchableOpacity style={styles.backPressable} onPress={onBack}>
                <Ionicons name="chevron-back" style={styles.icon} />
              </TouchableOpacity>
              <Typography
                variant="bodySmall"
                text="Back"
                customStyle={styles.backText}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.welcome.getName()}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name={ROUTES.logIn.getName()}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name={ROUTES.register.getName()}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </Stack>
  );
};

export default observer(App);

const styles = StyleSheet.create({
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backPressable: {
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  icon: {
    fontSize: 20,
    color: COLORS.primary,
  },
});
