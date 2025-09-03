import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {message || "Uppss error loading screen!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#0E0E0E",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FAF6F9",
    textAlign: "center",
  },
});
