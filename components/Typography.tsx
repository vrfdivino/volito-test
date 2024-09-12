import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

type TypographyProps = {
  variant: "screenTitle" | "error";
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
    color: "red",
    fontWeight: "bold",
  },
});
