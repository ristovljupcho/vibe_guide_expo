import React, { useEffect, useRef } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { TraitCarouselProps } from "@/scripts/types";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";
import { textStyles } from "../assets/styles/text.styles";

export default function TraitCarousel({
  traits,
}: {
  traits: TraitCarouselProps[];
}) {
  const flatListRef = useRef<FlatList<TraitCarouselProps> | null>(null);
  const scrollOffsetRef = useRef(0);

  // Duplicate traits for infinite scrolling
  const extendedTraits: TraitCarouselProps[] = Array(10).fill(traits).flat();

  // Smooth continuous scrolling
  useEffect(() => {
    let animationFrameId: number;
    const itemWidth = 150; // traitItem width (134) + marginHorizontal (8+8)
    const originalDataLength = traits.length * itemWidth;
    const scrollSpeed = 0.5; // Pixels per frame

    const scroll = () => {
      if (flatListRef.current) {
        scrollOffsetRef.current += scrollSpeed;

        // Reset to start when reaching the end
        if (scrollOffsetRef.current >= originalDataLength) {
          scrollOffsetRef.current = 0;
          flatListRef.current.scrollToOffset({
            offset: 0,
            animated: false,
          });
        } else {
          flatListRef.current.scrollToOffset({
            offset: scrollOffsetRef.current,
            animated: false,
          });
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [traits.length]);

  // Render each trait item
  const renderTraitItem = ({
    item,
  }: ListRenderItemInfo<TraitCarouselProps>) => (
    <View style={placeProfileStyles.traitItem}>
      <Text style={[textStyles.bodyText, placeProfileStyles.traitText]}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={placeProfileStyles.traitsSection}>
      <FlatList
        ref={flatListRef}
        data={extendedTraits}
        renderItem={renderTraitItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={placeProfileStyles.traitsContainer}
        scrollEnabled={false} // Auto-scroll only
      />
    </View>
  );
}
