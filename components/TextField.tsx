import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

import { COLORS } from "@/constants/theme";

type TextFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onPress?: () => void;
  customStyle?: StyleProp<TextStyle>;
  readOnly?: boolean;
};

const TextField = ({
  label,
  value,
  onChange,
  onPress,
  customStyle,
  readOnly,
}: TextFieldProps) => {
  return (
    <TextInput
      readOnly={readOnly}
      placeholder={label}
      value={value}
      onChangeText={onChange}
      onPress={onPress}
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
