import PlaceCard from "@/components/PlaceCard";
import { PlaceCardProps } from "@/scripts/types";
import React, { useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControlProps,
  StyleSheet,
  View,
} from "react-native";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";

type PlaceVerticalCarouselProps = {
  places: PlaceCardProps[];
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

export default function PlaceVerticalCarousel({
  places,
  refreshControl,
}: PlaceVerticalCarouselProps) {
  const flatListRef = useRef<FlatList<PlaceCardProps> | null>(null);

  const renderItem = ({ item }: ListRenderItemInfo<PlaceCardProps>) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
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
        snapToInterval={400}
        decelerationRate="fast"
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        refreshControl={refreshControl}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * 400,
            animated: true,
          });
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
});
