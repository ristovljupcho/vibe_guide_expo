import { COLORS } from "@/constants/colors";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { RADIUS, SPACING } from "@/assets/styles/shared/tokens";

type CarouselDotsProps = {
  activeIndex: number;
  count: number;
};

function CarouselDots({ activeIndex, count }: CarouselDotsProps) {
  if (count <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, index) => (
        <View
          key={`dot-${index}`}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  dot: {
    width: SPACING.sm,
    height: SPACING.sm,
    borderRadius: RADIUS.pill,
    marginHorizontal: SPACING.xxs,
  },
  activeDot: {
    width: SPACING.md,
    height: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: COLORS.textDimmed,
  },
});

export default memo(CarouselDots);
