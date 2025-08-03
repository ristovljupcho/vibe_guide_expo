import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
import { placeProfileStyles } from "../../assets/styles/place-profile.styles";
import { textStyles } from "../../assets/styles/text.styles";
import ImageCarousel from "../../components/ImageCarousel";
import TraitCarousel from "../../components/TraitCarousel";
import { COLORS } from "../../constants/colors";

function PlaceProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
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
        <TraitCarousel />

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
                  ,
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
            From exquisite coffee in the early mornings to heavenly cold pints
            full of draft beer and refreshing cocktails by the bar in the late
            summer evenings, we do it all. It is up to you to decide whether you
            want to enjoy your caffeinated beverage while doing some work, or
            whether you want to mingle through the crowd and dance the night
            away.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default PlaceProfileScreen;
