import FilterPopup from "@/components/FilterPopup";
import VerticalPlaceCardCarousel from "@/components/PlaceVerticalCarousel";
import { COLORS } from "@/constants/colors";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps, TraitCarouselProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { textStyles } from "../../assets/styles/text.styles";

export default function PlacesScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [traitsData, setTraitsData] = useState<TraitCarouselProps[]>([]);
  const [error, setError] = useState(false);
  const [isHeaderTextVisible, setIsHeaderTextVisible] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);

  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const textOpacityAnimation = useRef(new Animated.Value(0)).current;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      // Fetch places data
      const placesRes = await fetch(`${BASE_URL}/places`);
      if (!placesRes.ok) throw new Error("Failed to fetch places");
      const placesJson: PlaceCardProps[] = await placesRes.json();
      setPlacesData(placesJson || []);

      // Fetch traits data
      // const traitsRes = await fetch(`${BASE_URL}/traits`);
      // if (!traitsRes.ok) throw new Error("Failed to fetch traits");
      // const traitsJson: TraitCarouselProps[] = await traitsRes.json();
      // setTraitsData(traitsJson || []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(true);
      setPlacesData([]);
      setTraitsData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(backgroundAnimation, {
        toValue: isHeaderTextVisible ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacityAnimation, {
        toValue: isHeaderTextVisible ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isHeaderTextVisible, backgroundAnimation, textOpacityAnimation]);

  const animatedBackgroundColor = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.overlay1, COLORS.overlay3],
  });

  const handleFilterPress = () => {
    setIsFilterActive(!isFilterActive);
    setIsFilterMenuVisible(!isFilterMenuVisible);
  };

  const handleCloseMenu = () => {
    setIsFilterActive(false);
    setIsFilterMenuVisible(false);
  };

  const handleHeaderVisibilityChange = useCallback((isVisible: boolean) => {
    setIsHeaderTextVisible(isVisible);
  }, []);

  //todo: Handle refresh
  //todo: Handle error
  //todo: Handle empty list

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <Animated.View
        style={[styles.header, { backgroundColor: animatedBackgroundColor }]}
      >
        <View style={styles.headerSection}>
          {!isHeaderTextVisible && (
            <Animated.Text
              style={[
                textStyles.heading3Text,
                {
                  color: COLORS.textPrimary,
                  textAlign: "left",
                  letterSpacing: 3,
                  opacity: textOpacityAnimation,
                },
              ]}
            >
              All places
            </Animated.Text>
          )}
        </View>
        <View style={styles.headerSection} />
        <View style={[styles.headerSection, styles.iconsContainer]}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleFilterPress}>
            <AntDesign
              name="filter"
              size={24}
              color={isFilterActive ? COLORS.primary : "white"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="map-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Filter Popup */}
      <FilterPopup
        traits={traitsData}
        visible={isFilterMenuVisible}
        onClose={handleCloseMenu}
      />

      {/* Scrollable Content */}
      <View style={styles.body}>
        {/* Places Carousel */}
        <VerticalPlaceCardCarousel
          places={placesData}
          onHeaderVisibilityChange={handleHeaderVisibilityChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerSection: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 60,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconBtn: {
    padding: 6,
    marginLeft: 12,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% transparent white
    borderRadius: 10,
  },
});
