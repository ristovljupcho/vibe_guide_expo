import { useEffect, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { traits } from "../assets/data/traits.json";
import { placeProfileStyles } from "../assets/styles/place-profile.styles";
import { textStyles } from "../assets/styles/text.styles";

function TraitCarousel() {
  const flatListRef = useRef(null);
  const scrollOffsetRef = useRef(0);

  // Duplicate traits for infinite scrolling (e.g., 10 copies to ensure smooth looping)
  const extendedTraits = Array(10).fill(traits).flat();

  // Smooth continuous scrolling
  useEffect(() => {
    let animationFrameId;
    const itemWidth = 150; // traitItem width (134) + marginHorizontal (8 + 8)
    const originalDataLength = traits.length * itemWidth;
    const scrollSpeed = 0.5; // Pixels per frame (adjust for faster/slower scrolling)

    const scroll = () => {
      if (flatListRef.current) {
        scrollOffsetRef.current += scrollSpeed;
        // Reset to start of original data when reaching the end
        if (scrollOffsetRef.current >= originalDataLength) {
          scrollOffsetRef.current = 0;
          flatListRef.current.scrollToOffset({
            offset: 0,
            animated: false, // Instant reset for seamless loop
          });
        } else {
          flatListRef.current.scrollToOffset({
            offset: scrollOffsetRef.current,
            animated: false, // Smooth scrolling without visible animation jumps
          });
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, []);

  // Handle trait item press
  const handleTraitPress = (trait) => {
    navigation.navigate("TraitDetails", { trait });
    // Alternatively, for external links:
    // Linking.openURL(`https://example.com/traits/${trait.toLowerCase()}`);
  };

  // Render each trait item
  const renderTraitItem = ({ item }) => (
    <TouchableOpacity
      style={placeProfileStyles.traitItem}
      onPress={() => handleTraitPress(item)}
    >
      <Text style={[textStyles.bodyText, placeProfileStyles.traitText]}>
        {item}
      </Text>
    </TouchableOpacity>
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
        scrollEnabled={false}
      />
    </View>
  );
}

export default TraitCarousel;
