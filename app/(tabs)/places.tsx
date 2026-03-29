import { textStyles } from "@/assets/styles/shared/text.styles";
import { homeStyles } from "@/assets/styles/views/home.styles";
import PlaceHeader from "@/components/places/PlaceHeader";
import PlaceVerticalCarousel from "@/components/places/PlaceVerticalCarousel";
import EmptyState from "@/components/shared/states/EmptyState";
import LoadingState from "@/components/shared/states/LoadingState";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps, TraitCarouselProps } from "@/scripts/types";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function PlacesScreen() {
  const [placesData, setPlacesData] = useState<PlaceCardProps[]>([]);
  const [traitsData, setTraitsData] = useState<TraitCarouselProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(
    async (filters?: {
      traits?: string[];
      sortBy?: string;
      sortDirection?: string;
    }) => {
      try {
        setLoading(true);

        // Build query params dynamically
        const params = new URLSearchParams();
        if (filters?.traits && filters.traits.length > 0) {
          filters.traits.forEach((t) => params.append("traits", t));
        }
        if (filters?.sortBy) params.append("sortBy", filters.sortBy);
        if (filters?.sortDirection)
          params.append("sortDirection", filters.sortDirection);

        const placesUrl = `${BASE_URL}/places${
          params.toString() ? `?${params}` : ""
        }`;

        const [placesRes, traitsRes] = await Promise.all([
          fetch(placesUrl),
          fetch(`${BASE_URL}/traits`),
        ]);

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
    },
    []
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  if (loading && !refreshing) {
    return <LoadingState />;
  }

  if (!placesData || placesData.length === 0) {
    return (
      <View style={homeStyles.emptyStateContainer}>
        <EmptyState label={"No places found with that filter!"} />
        <View style={homeStyles.emptyStateActionWrapper}>
          <Pressable
            onPress={() => loadData()} // call default loadData without filters
            style={homeStyles.emptyStateAction}
          >
            <Text style={[textStyles.bodyText, homeStyles.emptyStateActionText]}>
              See all
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <PlaceHeader
        traits={traitsData}
        onApplyFilters={(
          selectedTraits,
          _price,
          selectedSort,
          selectedOrder
        ) => {
          loadData({
            traits: selectedTraits.map((t) => t.name), // backend expects string list
            sortBy: selectedSort || undefined,
            sortDirection: selectedOrder || undefined,
          });
        }}
      />
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
