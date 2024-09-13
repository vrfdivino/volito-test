import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { COLORS } from "@/constants/theme";

type ButtonProps = {
  label: string;
  variant: "contained" | "outline";
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: StyleProp<ViewStyle>;
};

const Button = ({
  label,
  variant,
  disabled,
  loading,
  onPress,
  customStyle,
}: ButtonProps) => {
  const handlePress = () => {
    if (disabled) return;
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles[variant], styles.pressable, customStyle]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "contained" ? COLORS.white : COLORS.primary}
        />
      ) : (
        <Text style={[styles[`text${variant}`], styles.text]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  textcontained: {
    color: "white",
  },
  contained: {
    backgroundColor: COLORS.primary,
  },
  textoutline: {
    color: COLORS.primary,
  },
  outline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
