import { TraitCarouselProps } from "@/scripts/types";
import { textStyles } from "@/assets/styles/shared/text.styles";
import { placeProfileStyles } from "@/assets/styles/views/place-profile.styles";
import React, { memo, useEffect, useRef } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";

function TraitCarousel({
  traits,
}: {
  traits: TraitCarouselProps[];
}) {
  const flatListRef = useRef<FlatList<TraitCarouselProps> | null>(null);
  const scrollOffsetRef = useRef(0);

  const extendedTraits: TraitCarouselProps[] = Array(10).fill(traits).flat();

  useEffect(() => {
    if (!traits.length) {
      return undefined;
    }

    let animationFrameId: number;
    const itemWidth = 150;
    const originalDataLength = traits.length * itemWidth;
    const scrollSpeed = 0.5;

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

export default memo(TraitCarousel);
