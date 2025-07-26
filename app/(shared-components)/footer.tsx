import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="home-outline" style={styles.icon} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="location-outline" style={styles.icon} />
        <Text style={styles.label}>Places</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="pricetags-outline" style={styles.icon} />
        <Text style={styles.label}>Offers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="heart-outline" style={styles.icon} />
        <Text style={styles.label}>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="person-outline" style={styles.icon} />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: "#fff",
  },
  label: {
    color: "#fff",
    fontSize: 12,
  },
});
