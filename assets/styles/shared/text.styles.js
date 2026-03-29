import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  captionsText: {
    fontFamily: "Lato_400Regular",
    fontSize: 10,
  },
  informationsText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
  },
  paragraphText: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
  },
  bodyText: {
    fontFamily: "Lato_400Regular",
    fontSize: 18,
  },
  heading3Text: {
    fontFamily: "Lato_700Bold",
    fontSize: 24,
  },
  heading2Text: {
    fontFamily: "Lato_700Bold",
    fontSize: 28,
  },
  heading1Text: {
    fontFamily: "Lato_900Black",
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  headingItalicText: {
    fontFamily: "Lato_900Black_Italic",
    fontSize: 32,
  },
  primaryColor: {
    color: COLORS.textPrimary,
  },
  secondaryColor: {
    color: COLORS.textDimmed,
  },
});
