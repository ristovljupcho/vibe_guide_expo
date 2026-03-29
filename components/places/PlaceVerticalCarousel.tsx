import { cardStyles } from "@/assets/styles/shared/card.styles";
import { CARD, SPACING } from "@/assets/styles/shared/tokens";
import { placeProfileStyles } from "@/assets/styles/views/place-profile.styles";
import PlaceCard from "@/components/places/PlaceCard";
import { PlaceCardProps } from "@/scripts/types";
import React, { memo, useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControlProps,
  StyleSheet,
  View,
} from "react-native";

type PlaceVerticalCarouselProps = {
  places: PlaceCardProps[];
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

function PlaceVerticalCarousel({
  places,
  refreshControl,
}: PlaceVerticalCarouselProps) {
  const flatListRef = useRef<FlatList<PlaceCardProps> | null>(null);

  const renderItem = ({ item }: ListRenderItemInfo<PlaceCardProps>) => (
    <View style={styles.cardContainer}>
      <View style={cardStyles.verticalCard}>
        <PlaceCard {...item} />
      </View>
    </View>
  );

  if (!places || places.length === 0) {
    return <View style={placeProfileStyles.carouselSection} />;
  }

  return (
    <View style={placeProfileStyles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={places}
        renderItem={renderItem}
        keyExtractor={(item, index) => `place-${item.id ?? index}`}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={CARD.height + SPACING.md}
        decelerationRate="fast"
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        refreshControl={refreshControl}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * (CARD.height + SPACING.md),
            animated: true,
          });
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    height: SPACING.md,
  },
});

export default memo(PlaceVerticalCarousel);
