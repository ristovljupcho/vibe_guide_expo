import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  Text,
  View,
  ViewToken,
} from "react-native";
import images from "../assets/data/images";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";

export default function ImageCarousel() {
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

  const renderDots = () => (
    <View style={placeProfileStyles.dotsContainer}>
      {images.map((_, index) => (
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
