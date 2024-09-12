import { useUserStore } from "@/stores/UserStore";
import { Stack } from "expo-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { INote, useNotesStore } from "@/stores/NotesStore";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

const App = () => {
  const { init: initUser, loading: loadingUser, user } = useUserStore();
  const { init: initNotes, loading: loadingNotes } = useNotesStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      initUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      query(collection(db, "notes"), where("userId", "==", user.id)),
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

  const loading = loadingUser || loadingNotes;

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="index" />
      <Stack.Screen name="note-details" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default observer(App);
