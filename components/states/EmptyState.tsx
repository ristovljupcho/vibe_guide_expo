import { textStyles } from "@/assets/styles/text.styles";
import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  label: string;
};

export default function EmptyState({ label }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.message, textStyles.bodyText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingVertical: 20,
  },
  message: {
    color: COLORS.textPrimary,
    opacity: 0.7,
    textAlign: "center",
    letterSpacing: 1,
  },
});
