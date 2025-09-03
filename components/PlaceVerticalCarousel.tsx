import { COLORS } from "@/constants/colors";
import { PlaceCardProps } from "@/scripts/types";
import React, { useRef } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { cardStyles } from "../assets/styles/card.styles";
import { textStyles } from "../assets/styles/text.styles";
import PlaceCard from "./PlaceCard";

type VerticalPlaceCardCarouselProps = {
  places: PlaceCardProps[];
  onHeaderVisibilityChange?: (isVisible: boolean) => void; // Callback to notify parent
};

export default function VerticalPlaceCardCarousel({
  places,
  onHeaderVisibilityChange,
}: VerticalPlaceCardCarouselProps) {
  const flatListRef = useRef<FlatList<PlaceCardProps> | null>(null);

  const renderItem = ({ item }: ListRenderItemInfo<PlaceCardProps>) => (
    <View style={{ alignItems: "center", marginVertical: 8 }}>
      <View style={cardStyles.verticalCard}>
        <PlaceCard {...item} />
      </View>
    </View>
  );

  // Define the header component
  const renderHeader = () => (
    <View
      style={{
        paddingVertical: 10,
        alignItems: "flex-start",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={[
          textStyles.heading2Text,
          { color: COLORS.textPrimary, textAlign: "left", letterSpacing: 3 },
        ]}
      >
        All places
      </Text>
    </View>
  );

  // Handle scroll to detect when header is out of view
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Assuming the header height is roughly 40 (paddingVertical: 10 + text height)
    // Adjust this threshold based on actual header height if needed
    const headerHeight = 40;
    const isHeaderVisible = scrollY < headerHeight;
    onHeaderVisibilityChange?.(isHeaderVisible);
  };

  if (!places || !Array.isArray(places) || places.length === 0) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={places}
      renderItem={renderItem}
      keyExtractor={(_, index) => `placecard-${index}`}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="normal"
      contentContainerStyle={{ paddingVertical: 5 }}
      ListHeaderComponent={renderHeader}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Optimize scroll event frequency
    />
  );
}
