import { useEffect } from "react";
import { Stack } from "expo-router";
import { observer } from "mobx-react-lite";
import { ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { auth, db } from "@/services/firebase";
import { ROUTES } from "@/constants/routes";
import { TABLES } from "@/constants/tables";
import { useUserStore } from "@/stores/UserStore";
import { INote, useNotesStore } from "@/stores/NotesStore";

const App = () => {
  // hooks
  const { init: initUser, loading, user } = useUserStore();
  const { init: initNotes } = useNotesStore();

  // effects
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      initUser(user);
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

  // render
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.noteDetails.getName()} />
      <Stack.Screen
        name={ROUTES.welcome.getName()}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default observer(App);
