import { COLORS } from "@/constants/colors";
import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});

export default memo(LoadingState);
