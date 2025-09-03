import { COLORS } from "@/constants/colors";
import { CANT_LOAD_SCREEN } from "@/constants/error-messages";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { textStyles } from "../../assets/styles/text.styles";
import VerticalPlaceCardCarousel from "@/components/PlaceVerticalCarousel";

export default function PlacesScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [error, setError] = useState(false);
  const [isHeaderTextVisible, setIsHeaderTextVisible] = useState(true); // Track header text visibility

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

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "white" }}>{CANT_LOAD_SCREEN}</Text>
      </View>
    );
  }

  if (!placesData || placesData.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "white" }}>No places found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <View style={styles.headerSection}>
          {!isHeaderTextVisible && (
            <Text
              style={[
                textStyles.heading3Text,
                {
                  color: COLORS.textPrimary,
                  textAlign: "left",
                  letterSpacing: 3,
                },
              ]}
            >
              All places
            </Text>
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
      </View>

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
    backgroundColor: COLORS.overlay1,
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
