import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { RADIUS, SPACING } from "@/assets/styles/shared/tokens";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  quickSearchSection: {
    marginHorizontal: SPACING.xxs,
    marginVertical: SPACING.md,
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
  loadingContainer: {
    justifyContent: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  emptyStateActionWrapper: {
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  emptyStateAction: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.section,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
  },
  emptyStateActionText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
