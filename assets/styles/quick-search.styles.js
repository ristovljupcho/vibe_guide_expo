import { StyleSheet } from "react-native";

export const quickSearchStyles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  square: {
    width: 75,
    height: 75,
    borderRadius: 8,
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
    color: "#FAF6F9",
    textAlign: "center",
    marginTop: 5,
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
