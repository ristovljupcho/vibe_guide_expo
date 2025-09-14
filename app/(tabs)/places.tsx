import { homeStyles } from "@/assets/styles/home.styles";
import PlaceHeader from "@/components/PlaceHeader";
import PlaceVerticalCarousel from "@/components/PlaceVerticalCarousel";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps, TraitCarouselProps } from "@/scripts/types";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { COLORS } from "../../constants/colors";

export default function PlacesScreen() {
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [traitsData, setTraitsData] = useState<TraitCarouselProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [placesRes, traitsRes] = await Promise.all([
        fetch(`${BASE_URL}/places`),
        fetch(`${BASE_URL}/traits`),
      ]);

      if (!placesRes.ok) {
        console.error("Failed to fetch places data");
        setPlacesData([]);
      }

      if (!traitsRes.ok) {
        console.error("Failed to fetch traits data");
        setPlacesData([]);
      }

      const [placesJson, traitsJson] = await Promise.all([
        placesRes.ok ? placesRes.json() : [],
        traitsRes.ok ? traitsRes.json() : [],
      ]);

      setPlacesData(placesJson);
      setTraitsData(traitsJson);
    } catch (error) {
      console.error("Error loading the data:", error);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  if (loading && !refreshing) {
    return (
      <View style={[placeProfileStyles.carouselSection, { flex: 1 }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <PlaceHeader traits={traitsData} />
      <PlaceVerticalCarousel
        places={placesData}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
}
