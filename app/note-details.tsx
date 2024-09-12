import { useFormik } from "formik";
import * as Crypto from "expo-crypto";
import { observer } from "mobx-react-lite";
import { db } from "@/services/firebase";
import { Fragment, useRef, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { TABLES } from "@/constants/tables";
import { useUserStore } from "@/stores/UserStore";
import { useNotesStore } from "@/stores/NotesStore";

const NoteDetailsScreen = () => {
  // hooks
  const { user, location } = useUserStore();
  const { getNoteById } = useNotesStore();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const note = getNoteById(noteId);
  const router = useRouter();

  // states
  const prevValues = useRef<any>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(!note ? true : false);

  // form
  const { values, setFieldValue, submitForm, setValues } = useFormik({
    initialValues: {
      id: note?.id || Crypto.randomUUID(),
      title: note?.title || "",
      body: note?.body || "",
      dateCreated: new Date(note?.dateCreated || Date.now()),
      userId: note?.userId || user?.id,
      location: note?.location
        ? { ...note.location }
        : {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        dateCreated: values.dateCreated.toISOString(),
      };
      await setDoc(doc(db, TABLES.notes, payload.id), payload);
    },
  });

  // handlers
  const onChangeTitle = (value: string) => {
    setFieldValue("title", value);
  };

  const onChangeBody = (value: string) => {
    setFieldValue("body", value);
  };

  const onToggleDatePicker = () => {
    if (!editing) return;
    setShowDatePicker((prev) => !prev);
  };

  const onChangeDateCreated = (value: Date | undefined) => {
    if (!value) return;
    setFieldValue("dateCreated", value);
  };

  const onSave = async () => {
    await submitForm();
    router.back();
  };

  const onEdit = () => {
    prevValues.current = values;
    setEditing(true);
  };

  const onCancelEdit = () => {
    setValues(prevValues.current);
    setEditing(false);
    setShowDatePicker(false);
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, TABLES.notes, values.id));
    router.back();
  };

  // render
  return (
    <View>
      <TextInput
        readOnly={!editing}
        value={values.title}
        onChangeText={onChangeTitle}
      />
      <TextInput
        readOnly={!editing}
        value={values.body}
        onChangeText={onChangeBody}
      />
      <TextInput
        readOnly={!editing}
        value={values.dateCreated.toISOString()}
        onPress={onToggleDatePicker}
      />
      {showDatePicker && (
        <DateTimePicker
          value={values.dateCreated}
          mode="date"
          is24Hour
          display="spinner"
          onChange={(_, date) => onChangeDateCreated(date)}
        />
      )}
      {!editing && (
        <Fragment>
          <Pressable onPress={onEdit}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={onDelete}>
            <Text>Delete</Text>
          </Pressable>
        </Fragment>
      )}
      {editing && (
        <Fragment>
          <Pressable onPress={onSave}>
            <Text>Save</Text>
          </Pressable>

          <Pressable onPress={onCancelEdit}>
            <Text>Cancel</Text>
          </Pressable>
        </Fragment>
      )}
    </View>
  );
};

export default observer(NoteDetailsScreen);
