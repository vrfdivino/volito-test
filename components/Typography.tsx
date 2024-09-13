import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

import { COLORS } from "@/constants/theme";

type TypographyProps = {
  variant: "screenTitle" | "error" | "body" | "bodySmall";
  text: string;
  customStyle?: StyleProp<TextStyle>;
};

const Typography = ({ variant, text, customStyle }: TypographyProps) => {
  return <Text style={[styles[variant], customStyle]}>{text}</Text>;
};

export default Typography;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  error: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 22,
  },
});
