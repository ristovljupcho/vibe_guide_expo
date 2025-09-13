import { cardStyles } from "@/assets/styles/card.styles";
import React, { useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, View, ViewToken } from "react-native";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";
import Card from "./Card";
import { CardProps } from "@/scripts/types";

type CarouselProps = {
  cards: CardProps[];
};

export default function CardCarousel({ cards }: CarouselProps) {
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

  const renderDots = () => (
    <View style={placeProfileStyles.dotsContainer}>
      {cards.map((_, index) => (
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

  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return <View style={placeProfileStyles.imageSection}></View>;
  }

  return (
    <View style={placeProfileStyles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={310}
        decelerationRate="fast"
        scrollEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * 310,
            animated: true,
          });
        }}
      />
      {renderDots()}
    </View>
  );
}
