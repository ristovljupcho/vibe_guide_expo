import PlaceCardCarousel from "@/components/PlaceCarousel";
import { BASE_URL } from "@/scripts/config";
import { EventAndOfferCardProps } from "@/scripts/types";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
import { textStyles } from "../../assets/styles/text.styles";
import CardCarousel from "../../components/CardCarousel";
import QuickSearchCarousel from "../../components/QuickSearchCarousel";
import { COLORS } from "../../constants/colors";
import { PlaceCardProps } from "@/components/PlaceCard";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [eventsData, setEventsData] = useState<EventAndOfferCardProps[]>([]);
  const [dailyOffersData, setDailyOffersData] = useState<
    EventAndOfferCardProps[]
  >([]);
  const [upcomingOffersData, setUpcomingOffersData] = useState<
    EventAndOfferCardProps[]
  >([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [placesRes, eventsRes, dailyOffersRes, upcomingOffersRes] =
        await Promise.all([
          fetch(`${BASE_URL}/places/top`),
          fetch(`${BASE_URL}/events/upcoming`),
          fetch(`${BASE_URL}/offers/daily`),
          fetch(`${BASE_URL}/offers/upcoming`),
        ]);

      if (!placesRes.ok) {
        console.error("Failed to fetch places data");
        setPlacesData([]);
      }
      if (!eventsRes.ok) {
        console.error("Failed to fetch events data");
        setEventsData([]);
      }
      if (!dailyOffersRes.ok) {
        console.error("Failed to fetch daily offers data");
        setEventsData([]);
      }
      if (!upcomingOffersRes.ok) {
        console.error("Failed to fetch upcoming offers data");
        setEventsData([]);
      }

      const [placesJson, eventsJson, dailyOffersJson, upcomingOffersJson] =
        await Promise.all([
          placesRes.ok ? placesRes.json() : [],
          eventsRes.ok ? eventsRes.json() : [],
          dailyOffersRes.ok ? dailyOffersRes.json() : [],
          upcomingOffersRes.ok ? upcomingOffersRes.json() : [],
        ]);

      setPlacesData(placesJson);
      setEventsData(eventsJson);
      setDailyOffersData(dailyOffersJson);
      setUpcomingOffersData(upcomingOffersJson);
    } catch (error) {
      console.error("Error loading the data:", error);
      // fallback: clear data so carousels don't break
      setPlacesData([]);
      setEventsData([]);
      setDailyOffersData([]);
      setUpcomingOffersData([]);
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

        {/*Upcoming Offers Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Upcoming Offers
          </Text>
          <CardCarousel cards={upcomingOffersData} />
        </View>

        {/*Daily Offers Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Daily Offers
          </Text>
          <CardCarousel cards={dailyOffersData} />
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
