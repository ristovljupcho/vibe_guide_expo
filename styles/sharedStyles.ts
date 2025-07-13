// Styles used for text
import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#222831",
    paddingVertical: 45,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "rgba(251, 101, 74, 0.15)", // 15% opacity
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 5,
    paddingTop: 3,
    alignSelf: "flex-start",
  },
  informationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
