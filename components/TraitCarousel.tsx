import React, { useEffect, useRef } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";
import { textStyles } from "../assets/styles/text.styles";

type TraitCarouselProps = {
  traits: string[];
};

export default function TraitCarousel({ traits }: TraitCarouselProps) {
  const flatListRef = useRef<FlatList<string> | null>(null);
  const scrollOffsetRef = useRef(0);

  // Duplicate traits for infinite scrolling
  const extendedTraits: string[] = Array(10).fill(traits).flat();

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
  const renderTraitItem = ({ item }: ListRenderItemInfo<string>) => (
    <View style={placeProfileStyles.traitItem}>
      <Text style={[textStyles.bodyText, placeProfileStyles.traitText]}>
        {item}
      </Text>
    </View>
  );

  return (
    <View style={placeProfileStyles.traitsSection}>
      <FlatList
        ref={flatListRef}
        data={extendedTraits}
        renderItem={renderTraitItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={placeProfileStyles.traitsContainer}
        scrollEnabled={false} // Auto-scroll only
      />
    </View>
  );
}
