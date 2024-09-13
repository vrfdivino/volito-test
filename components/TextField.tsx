import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/theme";

type TextFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onPress?: () => void;
  customStyle?: StyleProp<TextStyle>;
  readOnly?: boolean;
  showClear?: boolean;
  onClear?: () => void;
};

const TextField = ({
  label,
  value,
  onChange,
  onPress,
  customStyle,
  readOnly,
  showClear,
  onClear,
}: TextFieldProps) => {
  return (
    <View>
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
      {showClear && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Ionicons name="close" style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
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
    position: "relative",
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    top: "22%",
    right: 5,
  },
  clearIcon: {
    color: COLORS.white,
    fontSize: 13,
  },
});
