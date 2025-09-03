import VerticalPlaceCardCarousel from "@/components/PlaceVerticalCarousel";
import { COLORS } from "@/constants/colors";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { textStyles } from "../../assets/styles/text.styles";

export default function PlacesScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [error, setError] = useState(false);
  const [isHeaderTextVisible, setIsHeaderTextVisible] = useState(true); // Track header text visibility

  // Animation setup
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const textOpacityAnimation = useRef(new Animated.Value(0)).current;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`${BASE_URL}/places`);
      if (!res.ok) throw new Error("Failed to fetch places");

      const placesJson: PlaceCardProps[] = await res.json();
      setPlacesData(placesJson || []);
    } catch (err) {
      console.error("Error loading places:", err);
      setError(true);
      setPlacesData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Animate background color and text opacity when isHeaderTextVisible changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(backgroundAnimation, {
        toValue: isHeaderTextVisible ? 0 : 1, // 0 for overlay1, 1 for overlay3
        duration: 500, // Animation duration in ms
        useNativeDriver: false, // Color animations require non-native driver
      }),
      Animated.timing(textOpacityAnimation, {
        toValue: isHeaderTextVisible ? 0 : 1, // 0 for hidden, 1 for visible
        duration: 500, // Match background animation duration
        useNativeDriver: true, // Opacity animations can use native driver
      }),
    ]).start();
  }, [isHeaderTextVisible, backgroundAnimation, textOpacityAnimation]);

  // Interpolate background color between COLORS.overlay1 and COLORS.overlay3
  const animatedBackgroundColor = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.overlay1, COLORS.overlay3],
  });

  // Callback to handle header visibility changes
  const handleHeaderVisibilityChange = useCallback((isVisible: boolean) => {
    setIsHeaderTextVisible(isVisible);
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#BB86FC" />
      </View>
    );
  }

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
                  opacity: textOpacityAnimation, // Apply animated opacity
                },
              ]}
            >
              All places
            </Animated.Text>
          )}
        </View>
        <View style={styles.headerSection} />
        <View style={[styles.headerSection, styles.iconsContainer]}>
          <TouchableOpacity style={styles.iconBtn}>
            <AntDesign name="filter" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="map-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <View style={styles.body}>
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
    flex: 1, // Each section takes one-third of the header width
  },
  body: {
    flex: 1,
    marginTop: 60, // space for the header height
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Ensure icons are aligned to the right within their section
    alignItems: "center",
  },
  iconBtn: {
    padding: 6,
    marginLeft: 12,
  },
});
