import CardCarousel from "@/components/CardCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import PlaceInfoCard from "@/components/PlaceInfoCard";
import EmptyState from "@/components/states/EmptyState";
import ErrorState from "@/components/states/ErrorState";
import LoadingState from "@/components/states/LoadingState";
import TraitCarousel from "@/components/TraitCarousel";
import { CANT_LOAD_SCREEN } from "@/constants/error-messages";
import { BASE_URL } from "@/scripts/config";
import { CardProps, PlaceProps, TraitCarouselProps } from "@/scripts/types";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { textStyles } from "../../assets/styles/text.styles";
import { COLORS } from "../../constants/colors";

export default function PlaceProfileScreen() {
  const params = useLocalSearchParams();
  const placeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [place, setPlace] = useState<PlaceProps | null>(null);
  const [traits, setTraits] = useState<TraitCarouselProps[]>([]);
  const [activeEvents, setActiveEvents] = useState<CardProps[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CardProps[]>([]);
  const [activeOffers, setActiveOffers] = useState<CardProps[]>([]);
  const [upcomingOffers, setUpcomingOffers] = useState<CardProps[]>([]);
  const [error, setError] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    if (!placeId) return;

    try {
      setLoading(true);
      setError(false);

      const [
        placeRes,
        traitsRes,
        activeEventsRes,
        upcomingEventsRes,
        activeOffersRes,
        upcomingOffersRes,
      ] = await Promise.all([
        fetch(`${BASE_URL}/places/${placeId}`),
        fetch(`${BASE_URL}/places/${placeId}/traits/carousel`),
        fetch(`${BASE_URL}/events/active/${placeId}`),
        fetch(`${BASE_URL}/events/upcoming/${placeId}`),
        fetch(`${BASE_URL}/offers/active/${placeId}`),
        fetch(`${BASE_URL}/offers/upcoming/${placeId}`),
      ]);

      if (!placeRes.ok) throw new Error("Failed to fetch place data");
      if (!traitsRes.ok)
        throw new Error("Failed to fetch CAROUSEL traits data");
      if (!activeEventsRes.ok)
        throw new Error("Failed to fetch ACTIVE events data");
      if (!upcomingEventsRes.ok)
        throw new Error("Failed to fetch UPCOMING events data");
      if (!activeOffersRes.ok)
        throw new Error("Failed to fetch ACTIVE offers data");
      if (!upcomingOffersRes.ok)
        throw new Error("Failed to fetch UPCOMING offers data");

      const [
        placeJson,
        traitsJson,
        activeEventsJson,
        upcomingEventsJson,
        activeOffersJson,
        upcomingOffersJson,
      ] = await Promise.all([
        placeRes.json(),
        traitsRes.json(),
        activeEventsRes.json(),
        upcomingEventsRes.json(),
        activeOffersRes.json(),
        upcomingOffersRes.json(),
      ]);

      setPlace(placeJson);
      setTraits(traitsJson || []);
      setActiveEvents(activeEventsJson || []);
      setUpcomingEvents(upcomingEventsJson || []);
      setActiveOffers(activeOffersJson || []);
      setUpcomingOffers(upcomingOffersJson || []);
    } catch (err: any) {
      console.error(err);
      setError(true);
      setPlace(null);
      setTraits([]);
      setActiveEvents([]);
      setUpcomingEvents([]);
      setActiveOffers([]);
      setUpcomingOffers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [placeId]);

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

  if (error) {
    return <ErrorState message={CANT_LOAD_SCREEN} />;
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
        <Text
          style={[textStyles.headingItalicText, placeProfileStyles.heading]}
        >
          {place?.name}
        </Text>

        {/* Image carousel */}
        <ImageCarousel />

        {/* Traits carousel */}
        <TraitCarousel traits={traits} />

        {/* Info section */}
        <PlaceInfoCard
          rating={place?.rating ?? 0}
          type={place?.primaryType ?? ""}
          priceLevel={place?.priceLevel ?? ""}
          address={place?.address ?? ""}
          workingHours={[{ days: "Mon-Fri", hours: "9:00 - 18:00" }]}
          description={place?.description ?? ""}
        />

        {/* Active Events Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Active Events
          </Text>
          {activeEvents.length > 0 ? (
            <CardCarousel cards={activeEvents} />
          ) : (
            <EmptyState label="active events" />
          )}
        </View>

        {/* Upcoming Events Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Upcoming Events
          </Text>
          {upcomingEvents.length > 0 ? (
            <CardCarousel cards={upcomingEvents} />
          ) : (
            <EmptyState label="upcoming events" />
          )}
        </View>

        {/* Active Offers Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Active Offers
          </Text>
          {activeOffers.length > 0 ? (
            <CardCarousel cards={activeOffers} />
          ) : (
            <EmptyState label="active offers" />
          )}
        </View>

        {/* Upcoming Offers Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Upcoming Offers
          </Text>
          {upcomingOffers.length > 0 ? (
            <CardCarousel cards={upcomingOffers} />
          ) : (
            <EmptyState label="upcoming offers" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
