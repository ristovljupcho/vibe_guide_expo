import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  quickSearchSection: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  carouselSection: {
    marginTop: 10,
  },
  carouselTitle: {
    color: "#FAF6F9",
    textAlign: "left",
    letterSpacing: 3,
    marginHorizontal: 9,
    marginBottom: 5,
  },
});
