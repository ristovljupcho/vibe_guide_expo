import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  label: string;
};

export default function EmptyState({ label }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>There are no {label} at the moment! :(</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    color: "#FAF6F9",
    opacity: 0.7,
    textAlign: "center",
  },
});
