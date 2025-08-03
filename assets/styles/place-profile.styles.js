import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
const { height } = Dimensions.get("window");

export const placeProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  infoCard: {
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  infoText: {
    marginLeft: 3,
  },
  heading: {
    marginBottom: 9,
  },
  traitsSection: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  traitsContainer: {
    paddingHorizontal: 10,
  },
  traitItem: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  traitText: {
    color: "rgba(255, 255, 255, 0.25)",
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
    textAlign: "center",
  },
});
