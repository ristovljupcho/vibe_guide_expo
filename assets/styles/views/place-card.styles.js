import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { CARD, ELEVATION, RADIUS, SPACING } from "@/assets/styles/shared/tokens";

export const placeCardStyles = StyleSheet.create({
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
  cardBodyText: {
    color: COLORS.white,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  location: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: SPACING.xxs,
    color: COLORS.textPrimary,
  },
  traitsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 6,
    gap: 3,
  },
  traitText: {
    color: COLORS.white,
    backgroundColor: COLORS.overlay2,
    borderRadius: 3,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
  },
  descriptionText: {
    marginTop: SPACING.xxs,
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
});
