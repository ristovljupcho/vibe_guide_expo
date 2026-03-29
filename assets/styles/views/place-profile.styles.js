import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { CARD, RADIUS, SPACING } from "@/assets/styles/shared/tokens";

export const placeProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heading: {
    marginTop: SPACING.xxl,
    marginBottom: 25,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  traitsSection: {
    marginHorizontal: SPACING.xxs,
    marginVertical: SPACING.xs,
  },
  traitsContainer: {
    paddingHorizontal: SPACING.md,
  },
  traitItem: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  traitText: {
    color: COLORS.textPrimary,
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
  },
  imageSection: {
    marginHorizontal: SPACING.xxs,
    marginVertical: SPACING.xs,
    height: CARD.imageSectionHeight,
  },
  imageItem: {
    width: CARD.width,
    height: CARD.height,
    marginHorizontal: SPACING.xs,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: COLORS.textLight,
    textAlign: "center",
    fontSize: 16,
  },
  carouselSection: {
    marginTop: SPACING.md,
  },
  carouselTitle: {
    color: COLORS.textPrimary,
    textAlign: "left",
    letterSpacing: 3,
    marginHorizontal: 9,
    marginBottom: SPACING.xs,
  },
});
