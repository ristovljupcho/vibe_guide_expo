import { homeStyles } from "@/assets/styles/home.styles";
import { textStyles } from "@/assets/styles/text.styles";
import PlaceHeader from "@/components/PlaceHeader";
import PlaceVerticalCarousel from "@/components/PlaceVerticalCarousel";
import EmptyState from "@/components/states/EmptyState";
import LoadingState from "@/components/states/LoadingState";
import { BASE_URL } from "@/scripts/config";
import { PlaceCardProps, TraitCarouselProps } from "@/scripts/types";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, RefreshControl, Text, View } from "react-native";
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
      <View
        style={{
          backgroundColor: COLORS.background,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <EmptyState label={"No places found with that filter!"} />
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <Pressable
            onPress={() => loadData()} // call default loadData without filters
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.primary,
              borderRadius: 12,
            }}
          >
            <Text
              style={[
                textStyles.bodyText,
                {
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              ]}
            >
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
