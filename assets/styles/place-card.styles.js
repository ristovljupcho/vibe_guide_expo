import { StyleSheet } from "react-native";

export const placeCardStyles = StyleSheet.create({
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
    marginLeft: 4,
    color: "#FAF6F9",
  },
  traitsRow: {
    flexDirection: "row",
    alignContent: "space-between",
    flexWrap: "wrap",
    marginTop: 6,
    gap: 3,
  },
  traitText: {
    color: "#FAF9F6",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  descriptionText: {
    marginTop: 4,
    color: "#FAF9F6",
  },
  text: {
    color: "#FAF9F6",
  },
});
