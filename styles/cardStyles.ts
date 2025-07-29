// Styles used for card
import { StyleSheet } from "react-native";

export const cardGradientFrom = "rgba(0,0,0,0.1)";
export const cardGradientTo = "rgba(0,0,0,0.8)";

export const cardStyles = StyleSheet.create({
  card: {
    width: 280,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#bbf7d0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  badgeText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  textContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    zIndex: 10,
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: [{ translateY: -15 }],
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  nextButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
});
