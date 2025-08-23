import { events } from "@/assets/data/events";
import { offers } from "@/assets/data/offers";
import ImageCarousel from "@/components/ImageCarousel";
import TraitCarousel from "@/components/TraitCarousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { traits } from "../../assets/data/traits.json";
import { homeStyles } from "../../assets/styles/home.styles";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { textStyles } from "../../assets/styles/text.styles";
import CardCarousel from "../../components/CardCarousel";
import { COLORS } from "../../constants/colors";

function PlaceProfileScreen() {
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
        <Text
          style={[textStyles.headingItalicText, placeProfileStyles.heading]}
        >
          Casa Bar
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
                4.3
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
                st. Tiranska 1b
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
                  { marginTop: 10 }, // Fixed syntax error
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
            From exquisite coffee in the early mornings to heavenly cold pints
            full of draft beer and refreshing cocktails by the bar in the late
            summer evenings, we do it all. It is up to you to decide whether you
            want to enjoy your caffeinated beverage while doing some work, or
            whether you want to mingle through the crowd and dance the night
            away.
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
