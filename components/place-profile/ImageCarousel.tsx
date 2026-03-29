import { CARD } from "@/assets/styles/shared/tokens";
import { placeProfileStyles } from "@/assets/styles/views/place-profile.styles";
import CarouselDots from "@/components/shared/carousel/CarouselDots";
import React, { memo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  Text,
  View,
  ViewToken,
} from "react-native";
import images from "@/assets/data/images";

function ImageCarousel() {
  const flatListRef = useRef<FlatList<ImageSourcePropType> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const renderImageItem = ({
    item,
  }: ListRenderItemInfo<ImageSourcePropType>) => (
    <View style={placeProfileStyles.imageItem}>
      <Image
        source={item}
        style={placeProfileStyles.image}
        resizeMode="cover"
      />
    </View>
  );

  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <View style={placeProfileStyles.imageSection}>
        <Text style={placeProfileStyles.errorText}>No images available</Text>
      </View>
    );
  }

  return (
    <View style={placeProfileStyles.imageSection}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(_, index) => `image-${index}`}
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
      <CarouselDots activeIndex={currentIndex} count={images.length} />
    </View>
  );
}

export default memo(ImageCarousel);
