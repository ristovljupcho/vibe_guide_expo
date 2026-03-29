import { COLORS } from "@/constants/colors";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

type ErrorStateProps = {
  message?: string;
};

function ErrorState({ message }: ErrorStateProps) {
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
    backgroundColor: COLORS.background,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
});

export default memo(ErrorState);
