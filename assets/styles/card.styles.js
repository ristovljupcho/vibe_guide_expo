import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  carouselSection: {
    marginHorizontal: 4,
    marginVertical: 5,
    height: 220, // Image height + dots
  },
  card: {
    width: 300,
    height: 200,
    marginHorizontal: 5,
    borderRadius: 10,
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
  cardTitle: {
    letterSpacing: 3,
    fontStyle: "italic",
    color: "#FAF9F6",
  },
  location: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  timeText: {
    color: "#FAF9F6",
  },
  descriptionText: {
    marginTop: 2,
    color: "#FAF9F6",
  },
  text: {
    color: "#FAF9F6",
  },
});
