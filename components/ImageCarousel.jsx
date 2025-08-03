import { useRef, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import images from "../assets/data/images";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";

const ImageCarousel = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if images is undefined or empty
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <View style={placeProfileStyles.imageSection}>
        <Text style={placeProfileStyles.errorText}>No images available</Text>
      </View>
    );
  }

  // Track visible image for dots
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Render each image item
  const renderImageItem = ({ item }) => (
    <View style={placeProfileStyles.imageItem}>
      <Image
        source={item}
        style={placeProfileStyles.image}
        resizeMode="cover"
      />
    </View>
  );

  // Render pagination dots
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

  return (
    <View style={placeProfileStyles.imageSection}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(_, index) => `image-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={310} // image width (300) + marginHorizontal (5 + 5)
        decelerationRate="fast"
        scrollEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onScrollToIndexFailed={(info) => {
          flatListRef.current.scrollToOffset({
            offset: info.index * 310,
            animated: true,
          });
        }}
      />
      {renderDots()}
    </View>
  );
};

export default ImageCarousel;
