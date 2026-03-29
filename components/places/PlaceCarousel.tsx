import { PlaceCardProps } from "@/scripts/types";
import React, { memo, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, View, ViewToken } from "react-native";
import { cardStyles } from "@/assets/styles/shared/card.styles";
import { CARD } from "@/assets/styles/shared/tokens";
import CarouselDots from "@/components/shared/carousel/CarouselDots";
import PlaceCard from "@/components/places/PlaceCard";

type PlaceCardCarouselProps = {
  places: PlaceCardProps[];
};

function PlaceCardCarousel({ places }: PlaceCardCarouselProps) {
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

  if (!places || !Array.isArray(places) || places.length === 0) {
    return <View style={cardStyles.carouselSection} />;
  }

  return (
    <View style={cardStyles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={places}
        renderItem={renderItem}
        keyExtractor={(_, index) => `placecard-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD.snapInterval}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * CARD.snapInterval,
            animated: true,
          });
        }}
      />
      <CarouselDots activeIndex={currentIndex} count={places.length} />
    </View>
  );
}

export default memo(PlaceCardCarousel);
