import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

// MARGIN HORIZONTAL -> 4
// MARGIN BOTTOM -> 5, 10, 15
export const placeProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heading: {
    marginVertical: 20,
    textAlign: "center",
    marginBottom: 25,
    color: "#FAF6F9",
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 4,
    marginVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
  },
  infoSection: {
    width: "50%",
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
  },
  workingHoursSection: {
    flex: 1,
    flexDirection: "row",
  },
  infoText: {
    color: "#FAF6F9",
    textAlign: "left",
    marginLeft: 5,
  },
  traitsSection: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  traitsContainer: {
    paddingHorizontal: 10,
  },
  traitItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  traitText: {
    color: "#FAF6F9",
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
  },
  descriptionSection: {
    marginHorizontal: 4,
    marginVertical: 5,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    borderTopWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  descriptionText: {
    color: "rgba(255, 255, 255, 0.25)",
    lineHeight: 27,
    textAlign: "justify",
  },
  imageSection: {
    marginHorizontal: 4,
    marginVertical: 5,
    height: 220, // Image height + dots
  },
  imageItem: {
    width: 300,
    height: 200,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  errorText: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 16,
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
