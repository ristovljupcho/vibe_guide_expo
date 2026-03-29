import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { RADIUS, SPACING } from "@/assets/styles/shared/tokens";

export const quickSearchStyles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: SPACING.xxs,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: SPACING.xxs,
  },
  square: {
    width: 75,
    height: 75,
    borderRadius: RADIUS.sm,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    zIndex: 0,
  },
  label: {
    color: COLORS.textPrimary,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  imageWrapper: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  image: {
    flex: 1,
  },
});
