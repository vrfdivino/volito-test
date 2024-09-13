import { DateTime } from "luxon";
import { useFormik } from "formik";
import { Image } from "expo-image";
import * as Crypto from "expo-crypto";
import { observer } from "mobx-react-lite";
import * as ImagePicker from "expo-image-picker";
import { Fragment, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import Button from "@/components/Button";
import { COLORS } from "@/constants/theme";
import { TABLES } from "@/constants/tables";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { useUserStore } from "@/stores/UserStore";
import { db, storage } from "@/services/firebase";
import { useNotesStore } from "@/stores/NotesStore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

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
  const [imageBlob, setImageBlob] = useState<Blob | undefined>();

  // form
  const { values, errors, setFieldValue, submitForm, setValues } = useFormik({
    initialValues: {
      id: note?.id || Crypto.randomUUID(),
      title: note?.title || "",
      body: note?.body || "",
      dateCreated: new Date(note?.dateCreated || Date.now()),
      userId: note?.userId || user?.id,
      image: note?.image || "",
      imageName: note?.imageName || "",
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

      if (!imageBlob) {
        setFieldError("image", "Error uploading the image.");
        return;
      }

      try {
        const imageRef = ref(storage, payload.id);
        const imageUpload = await uploadBytes(imageRef, imageBlob);
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${imageUpload.ref.bucket}/o/${imageUpload.ref.fullPath}?alt=media`;

        await setDoc(doc(db, TABLES.notes, payload.id), {
          ...payload,
          image: imageUrl,
        });
      } catch (err) {
        setFieldError("image", "Error uploading the image.");
        return;
      }
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
    const imageRef = ref(storage, values.id);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, TABLES.notes, values.id));
    setLoading(false);
    router.back();
  };

  const onPickImage = async () => {
    if (!editing) return;

    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.assets && result.assets[0]) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setFieldValue("image", result.assets[0].uri);
      setFieldValue("imageName", result.assets[0].fileName || "");
      setImageBlob(blob);
    }

    setLoading(false);
  };

  const onClearImage = () => {
    setFieldValue("image", "");
    setFieldValue("imageName", "");
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
        {errors.title && <Typography variant="error" text={errors.title} />}
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
      <View>
        <Typography
          variant={"bodySmall"}
          text={"Image"}
          customStyle={styles.label}
        />
        {values.image && (
          <Image
            source={{
              uri: values.image,
            }}
            style={styles.image}
          />
        )}
        <TextField
          label="Image"
          readOnly={!editing}
          value={values.imageName}
          onPress={onPickImage}
          showClear={!!values.image && editing}
          onClear={onClearImage}
        />
        {errors.image && <Typography variant="error" text={errors.image} />}
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
          {note && (
            <Button
              variant="outline"
              label="Cancel"
              onPress={onCancelEdit}
              disabled={loading}
            />
          )}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
});
