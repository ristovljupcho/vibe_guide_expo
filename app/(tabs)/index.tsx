import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { events } from "../../assets/data/events";
import { homeStyles } from "../../assets/styles/home.styles";
import { textStyles } from "../../assets/styles/text.styles";
import CardCarousel from "../../components/CardCarousel";
import QuickSearchCarousel from "../../components/QuickSearchCarousel";
import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      // Add actual data fetching logic here if needed
      // Example: const fetchedEvents = await fetchEvents();
    } catch (error) {
      console.log("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

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
        <View style={homeStyles.quickSearchSection}>
          <QuickSearchCarousel />
        </View>
        {/* Events Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Events
          </Text>
          <CardCarousel cards={events} />
        </View>
        {/* Offers Carousel */}
        <View style={homeStyles.carouselSection}>
          <Text style={[homeStyles.carouselTitle, textStyles.heading2Text]}>
            Offers
          </Text>
          <CardCarousel cards={events} />
        </View>
      </ScrollView>
    </View>
  );
}
