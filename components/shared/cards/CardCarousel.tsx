import { cardStyles } from "@/assets/styles/shared/card.styles";
import { CARD } from "@/assets/styles/shared/tokens";
import { CardProps } from "@/scripts/types";
import React, { memo, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, View, ViewToken } from "react-native";
import CarouselDots from "@/components/shared/carousel/CarouselDots";
import Card from "@/components/shared/cards/Card";

type CarouselProps = {
  cards: CardProps[];
};

function CardCarousel({ cards }: CarouselProps) {
  const flatListRef = useRef<FlatList<CardProps> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const renderItem = ({ item }: ListRenderItemInfo<CardProps>) => (
    <View style={cardStyles.card}>
      <Card {...item} />
    </View>
  );

  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return <View style={cardStyles.carouselSection} />;
  }

  return (
    <View style={cardStyles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD.snapInterval}
        decelerationRate="fast"
        scrollEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * CARD.snapInterval,
            animated: true,
          });
        }}
      />
      <CarouselDots activeIndex={currentIndex} count={cards.length} />
    </View>
  );
}

export default memo(CardCarousel);
