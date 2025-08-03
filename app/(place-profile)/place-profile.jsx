import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { traits } from "../../assets/data/traits.json";
import { homeStyles } from "../../assets/styles/home.styles";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { textStyles } from "../../assets/styles/text.style";
import { COLORS } from "../../constants/colors";

function PlaceProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const scrollOffsetRef = useRef(0);

  // Duplicate traits for infinite scrolling (e.g., 10 copies to ensure smooth looping)
  const extendedTraits = Array(10).fill(traits).flat();

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

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
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={homeStyles.scrollContent}
      >
        {/* Information Section */}
        <View style={placeProfileStyles.infoCard}>
          <Text style={[textStyles.heading1Text, placeProfileStyles.heading]}>
            Casa Bar
          </Text>

          <View style={placeProfileStyles.infoRow}>
            <AntDesign name="staro" size={24} color="#FAF6F9" />
            <Text style={[textStyles.bodyText, placeProfileStyles.infoText]}>
              4.3
            </Text>
          </View>

          <View style={placeProfileStyles.infoRow}>
            <Ionicons name="location-outline" size={24} color="#FAF6F9" />
            <Text style={[textStyles.bodyText, placeProfileStyles.infoText]}>
              st. Tiranska 1b
            </Text>
          </View>

          <View style={placeProfileStyles.infoRow}>
            <Ionicons name="timer-outline" size={24} color="#FAF6F9" />
            <Text style={[textStyles.bodyText, placeProfileStyles.infoText]}>
              st. Tiranska 1b
            </Text>
          </View>
        </View>

        {/* Images Section (Carousel) */}
        <View></View>

        {/* Traits Section (Carousel) */}
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

        {/* Description Section */}
        <View style={placeProfileStyles.descriptionSection}>
          <Text
            style={[placeProfileStyles.descriptionText, textStyles.bodyText]}
          >
            From exquisite coffee in the early mornings to heavenly cold pints
            full of draft beer and refreshing cocktails by the bar in the late
            summer evenings, we do it all. It is up to you to decide whether you
            want to enjoy your caffeinated beverage while doing some work, or
            whether you want to mingle through the crowd and dance the night
            away.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default PlaceProfileScreen;
