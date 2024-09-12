import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

import { COLORS } from "@/constants/theme";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  customStyle?: StyleProp<TextStyle>;
};

const TextField = ({ label, value, onChange, customStyle }: TextFieldProps) => {
  return (
    <TextInput
      placeholder={label}
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
      autoCorrect={false}
      style={[customStyle, styles.root]}
      selectionColor={COLORS.primary}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
});
