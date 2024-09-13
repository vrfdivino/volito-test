import { DateTime } from "luxon";
import { useFormik } from "formik";
import * as Crypto from "expo-crypto";
import { observer } from "mobx-react-lite";
import { Fragment, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import { db } from "@/services/firebase";
import Button from "@/components/Button";
import { COLORS } from "@/constants/theme";
import { TABLES } from "@/constants/tables";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
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
  const [loading, setLoading] = useState<boolean>(false);

  // form
  const { values, errors, setFieldValue, submitForm, setValues } = useFormik({
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
    onSubmit: async (values, { setFieldError }) => {
      setLoading(true);
      const payload = {
        ...values,
        dateCreated: values.dateCreated.toISOString(),
      };
      if (!payload.title) {
        setFieldError("title", "Note title is required.");
        return;
      }
      await setDoc(doc(db, TABLES.notes, payload.id), payload);
      setLoading(false);
      router.back();
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
    setLoading(true);
    await deleteDoc(doc(db, TABLES.notes, values.id));
    setLoading(false);
    router.back();
  };

  // render
  return (
    <View style={styles.root}>
      <View>
        <Typography
          variant={"bodySmall"}
          text={"Title*"}
          customStyle={styles.label}
        />
        <TextField
          label="Title"
          readOnly={!editing}
          value={values.title}
          onChange={onChangeTitle}
        />
      </View>
      <View>
        <Typography
          variant={"bodySmall"}
          text={"Body"}
          customStyle={styles.label}
        />
        <TextField
          label="Body"
          readOnly={!editing}
          value={values.body}
          onChange={onChangeBody}
        />
      </View>
      <View>
        <Typography
          variant={"bodySmall"}
          text={"Date"}
          customStyle={styles.label}
        />
        <TextField
          label="Date"
          readOnly={!editing}
          value={DateTime.fromISO(values.dateCreated.toISOString()).toFormat(
            "DD"
          )}
          onPress={onToggleDatePicker}
        />
      </View>
      {showDatePicker && (
        <Modal visible={showDatePicker} animationType="fade">
          <View style={styles.modal}>
            <DateTimePicker
              value={values.dateCreated}
              mode="date"
              is24Hour
              display="spinner"
              onChange={(_, date) => onChangeDateCreated(date)}
            />
            <Button
              label="Close"
              variant="contained"
              onPress={onToggleDatePicker}
            />
          </View>
        </Modal>
      )}
      {errors.title && <Typography variant="error" text={errors.title} />}
      {!editing && (
        <Fragment>
          <Button
            variant="contained"
            label="Edit"
            onPress={onEdit}
            disabled={loading}
          />
          <Button
            variant="outline"
            label="Delete"
            onPress={onDelete}
            loading={loading}
          />
        </Fragment>
      )}
      {editing && (
        <Fragment>
          <Button
            variant="contained"
            label="Save"
            onPress={onSave}
            loading={loading}
          />
          <Button
            variant="outline"
            label="Cancel"
            onPress={onCancelEdit}
            disabled={loading}
          />
        </Fragment>
      )}
    </View>
  );
};

export default observer(NoteDetailsScreen);

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.white,
    padding: 20,
    height: "100%",
    width: "100%",
    gap: 10,
  },
  label: {
    fontWeight: "bold",
  },
  modal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 20,
    gap: 10,
  },
});
