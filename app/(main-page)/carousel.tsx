import React, { useRef, useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Card, { CardProps } from "./card";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

type CarouselProps = {
  cards: CardProps[];
};

export default function Carousel({ cards }: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate snap offsets for each card
  const snapToOffsets = useMemo(() => {
    const offsets: number[] = [];
    cards.forEach((_, index) => {
      if (index === cards.length - 1) {
        // Last card: Align to the left edge (offset accounts for previous cards)
        offsets.push(index * (CARD_WIDTH + SPACING));
      } else {
        // Other cards: Regular spacing
        offsets.push(index * (CARD_WIDTH + SPACING));
      }
    });
    return offsets;
  }, [cards]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (CARD_WIDTH + SPACING));
    setCurrentIndex(Math.min(index, cards.length - 1));
  };

  const renderItem = ({ item }: { item: CardProps }) => (
    <View style={styles.cardContainer}>
      <Card {...item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets} // Use custom snap offsets
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingLeft: SPACING, // Only left padding to align last card to left edge
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: SPACING, // Only right margin to avoid extra space after last card
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "rgba(251, 101, 74,1)",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
