import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { CARD, ELEVATION, RADIUS, SPACING } from "./tokens";

export const cardStyles = StyleSheet.create({
  carouselSection: {
    marginHorizontal: SPACING.xxs,
    marginVertical: SPACING.xs,
    height: CARD.imageSectionHeight,
  },
  card: {
    width: CARD.width,
    height: CARD.height,
    marginHorizontal: SPACING.xs,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    position: "relative",
    ...ELEVATION,
  },
  verticalCard: {
    width: CARD.width,
    height: CARD.height,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    position: "relative",
    ...ELEVATION,
  },
  textContainer: {
    position: "absolute",
    right: SPACING.lg,
    bottom: SPACING.lg,
    left: SPACING.lg,
    zIndex: 10,
  },
  cardTitle: {
    letterSpacing: 3,
    fontStyle: "italic",
    color: COLORS.white,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  timeText: {
    color: COLORS.white,
  },
  descriptionText: {
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
});
