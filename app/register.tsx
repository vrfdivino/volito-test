import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Button from "@/components/Button";
import { auth } from "@/services/firebase";
import { ROUTES } from "@/constants/routes";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";

const RegisterScreen = () => {
  // hooks
  const router = useRouter();
  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setError(undefined);
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
      } catch (err) {
        if (err instanceof FirebaseError) {
          setError(err.message);
        }
      }
    },
  });

  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // handlers
  const onRegister = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  const onLogIn = () => {
    router.replace(ROUTES.logIn.getHref());
  };

  const onChangeEmail = (value: string) => {
    setFieldValue("email", value);
  };

  const onChangePassword = (value: string) => {
    setFieldValue("password", value);
  };

  // render
  return (
    <View style={styles.root}>
      <Typography
        variant={"screenTitle"}
        text={"Register"}
        customStyle={{
          textAlign: "center",
        }}
      />
      <TextField
        label={"Email"}
        value={values.email}
        onChange={onChangeEmail}
      />
      <TextField
        label={"Password"}
        value={values.password}
        onChange={onChangePassword}
      />
      {error && <Typography variant={"error"} text={error} />}
      <Button
        label={"Register"}
        variant={"contained"}
        onPress={onRegister}
        loading={loading}
      />
      <Button
        label={"Log In"}
        variant={"outline"}
        onPress={onLogIn}
        disabled={loading}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    gap: 12,
  },
});
