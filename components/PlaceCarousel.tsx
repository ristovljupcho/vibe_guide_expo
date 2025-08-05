import React, { useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, View, ViewToken } from "react-native";
import { cardStyles } from "../assets/styles/card.styles";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";
import PlaceCard, { PlaceCardProps } from "./PlaceCard"; // Your PlaceCard component path

type PlaceCardCarouselProps = {
  places: PlaceCardProps[];
};

export default function PlaceCardCarousel({ places }: PlaceCardCarouselProps) {
  const flatListRef = useRef<FlatList<PlaceCardProps> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const renderItem = ({ item }: ListRenderItemInfo<PlaceCardProps>) => (
    <View style={cardStyles.card}>
      <PlaceCard {...item} />
    </View>
  );

  const renderDots = () => (
    <View style={placeProfileStyles.dotsContainer}>
      {places.map((_, index) => (
        <View
          key={index}
          style={[
            placeProfileStyles.dot,
            currentIndex === index
              ? placeProfileStyles.activeDot
              : placeProfileStyles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  if (!places || !Array.isArray(places) || places.length === 0) {
    return <View style={placeProfileStyles.imageSection} />;
  }

  return (
    <View style={placeProfileStyles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={places}
        renderItem={renderItem}
        keyExtractor={(_, index) => `placecard-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={320} // Adjust width + margin to fit your PlaceCard width
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * 320,
            animated: true,
          });
        }}
      />
      {renderDots()}
    </View>
  );
}
