import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageCarousel from "@/components/ImageCarousel";
import TraitCarousel from "@/components/TraitCarousel";
import CardCarousel from "@/components/CardCarousel";
import {
  PlaceInfromationProps,
  TraitCarouselProps,
  EventAndOfferCardProps,
} from "@/scripts/types";
import { homeStyles } from "../../assets/styles/home.styles";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { textStyles } from "../../assets/styles/text.styles";
import { COLORS } from "../../constants/colors";
import { BASE_URL } from "@/scripts/config";
import { useLocalSearchParams } from "expo-router";

function PlaceProfileScreen() {
  // Assign the placeId passed down
  const params = useLocalSearchParams();
  const placeId = params.placeId as string;

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [place, setPlace] = useState<PlaceInfromationProps>();
  const [traits, setTraits] = useState<TraitCarouselProps[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [placeRes, traitsRes, eventsRes, offersRes] = await Promise.all([
        fetch(`${BASE_URL}/places/${placeId}`),
        fetch(`${BASE_URL}/places/${placeId}/traits/carousel`),
        fetch(`${BASE_URL}/events`),
        fetch(`${BASE_URL}/offers`),
      ]);

      if (!placeRes.ok || !traitsRes.ok || eventsRes.ok || offersRes.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const [placeJson, traitsJson, eventsJson, offersJson] = await Promise.all(
        [placeRes.json(), traitsRes.json(), eventsRes.json(), offersRes.json()]
      );

      setPlace(placeJson || []);
      setTraits(traitsJson || []);
      setEvents(eventsJson || []);
      setOffers(offersJson || []);
      console.log(place?.address);
    } catch (error) {
      console.error("Error loading the data:", error);
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
        <Text
          style={[textStyles.headingItalicText, placeProfileStyles.heading]}
        >
          {place?.name}
        </Text>

        {/* Images Section (Carousel) */}
        <ImageCarousel />

        {/* Traits Section (Carousel) */}
        <TraitCarousel traits={traits} />

        {/* Information Section */}
        <View style={placeProfileStyles.infoCard}>
          <View style={placeProfileStyles.infoSection}>
            <View style={placeProfileStyles.infoRow}>
              <AntDesign name="star" size={16} color="#FFDE21" />
              <Text
                style={[
                  textStyles.informationsText,
                  placeProfileStyles.infoText,
                ]}
              >
                {place?.rating}
              </Text>
            </View>
            <View style={[placeProfileStyles.infoRow, { marginTop: 10 }]}>
              <Ionicons name="location-outline" size={16} color="#FAF6F9" />
              <Text
                style={[
                  textStyles.informationsText,
                  placeProfileStyles.infoText,
                ]}
              >
                {place?.address}
              </Text>
            </View>
          </View>
          <View style={placeProfileStyles.workingHoursSection}>
            <AntDesign name="clockcircleo" size={16} color="#FAF6F9" />
            <View>
              <Text
                style={[
                  textStyles.informationsText,
                  placeProfileStyles.infoText,
                ]}
              >
                Fri - Sat : 08:00 to 01:00
              </Text>
              <Text
                style={[
                  textStyles.informationsText,
                  placeProfileStyles.infoText,
                  { marginTop: 10 },
                ]}
              >
                Sun - Thu : 08:00 to 00:00
              </Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={placeProfileStyles.descriptionSection}>
          <Text
            style={[placeProfileStyles.descriptionText, textStyles.bodyText]}
          >
            {place?.description}
          </Text>
        </View>

        {/* Events Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Our events
          </Text>
          <CardCarousel cards={events} />
        </View>

        {/* Offers Carousel */}
        <View style={placeProfileStyles.carouselSection}>
          <Text
            style={[placeProfileStyles.carouselTitle, textStyles.heading2Text]}
          >
            Offers for you
          </Text>
          <CardCarousel cards={offers} />
        </View>
      </ScrollView>
    </View>
  );
}

export default PlaceProfileScreen;
