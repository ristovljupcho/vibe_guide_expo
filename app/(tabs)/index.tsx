import PlaceCardCarousel from "@/components/PlaceCarousel";
import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
import { textStyles } from "../../assets/styles/text.styles";
import CardCarousel from "../../components/CardCarousel";
import QuickSearchCarousel from "../../components/QuickSearchCarousel";
import { COLORS } from "../../constants/colors";
import { BASE_URL } from "@/scripts/config";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [placesData, setPlacesData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch both in parallel for speed
      const [placesRes, eventsRes] = await Promise.all([
        fetch(`${BASE_URL}/places`),
        fetch(`${BASE_URL}/places`),
      ]);

      if (!placesRes.ok || !eventsRes.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const [placesJson, eventsJson] = await Promise.all([
        placesRes.json(),
        eventsRes.json(),
      ]);

      setPlacesData(placesJson || []);
      setEventsData(eventsJson || []);
    } catch (error) {
      console.error("Error loading the data:", error);
      // fallback: clear data so carousels don't break
      setPlacesData([]);
      setEventsData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  // Show spinner while initial load is happening
  if (loading && !refreshing) {
    return (
      <View style={[homeStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
        {/* Quick Search */}
        <View style={homeStyles.quickSearchSection}>
          <QuickSearchCarousel />
        </View>

        {/* Top Places Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Top places
          </Text>
          <PlaceCardCarousel places={placesData} />
        </View>

        {/* Events Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Events
          </Text>
          <CardCarousel cards={eventsData} />
        </View>

        {/* Offers Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Offers
          </Text>
          <CardCarousel cards={eventsData} />
        </View>

        {/* Trending Places Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Trending places
          </Text>
          <PlaceCardCarousel places={placesData} />
        </View>
      </ScrollView>
    </View>
  );
}
