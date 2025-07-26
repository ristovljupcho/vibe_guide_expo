import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import DailyOfferDisplay from "./daily-offers-display";
import EventDisplay from "./events-display";
import QuickSearch from "./quick-search";
import Footer from "../(shared-components)/footer";

// Styles
import { sharedStyles } from "@/styles/sharedStyles";
import { textStyles } from "@/styles/textStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const footerHeight = 60; // Adjust based on your Footer component's actual height

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView
        style={[
          sharedStyles.mainContainer,
          { backgroundColor: "#121212", flex: 1 },
        ]}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "flex-start",
          paddingBottom: footerHeight, // Only account for Footer height
          minHeight: screenHeight - insets.top - insets.bottom - footerHeight, // Constrain content height
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuickSearch />
        {/* UPCOMMING EVENTS CAROUSEL */}
        <View style={textStyles.groupContainer}>
          <View style={[sharedStyles.informationRow]}>
            <Text style={[textStyles.text, textStyles.headingText]}>
              Today's DAILY OFFERS!
            </Text>
            {/* LINK VIEW MORE */}
            <Link href={"/(main-page)/daily-offer-card"} asChild>
              <Pressable style={sharedStyles.button}>
                <Text
                  style={[
                    textStyles.text,
                    textStyles.captionsText,
                    textStyles.buttonText,
                  ]}
                >
                  See all
                </Text>
              </Pressable>
            </Link>
          </View>

          <EventDisplay />
        </View>
        {/* UPCOMMING EVENTS CAROUSEL (Repeated) */}
        <View style={textStyles.groupContainer}>
          <View style={[sharedStyles.informationRow]}>
            <Text style={[textStyles.text, textStyles.headingText]}>
              Today's DAILY OFFERS!
            </Text>
            {/* LINK VIEW MORE */}
            <Link href={"/(main-page)/daily-offer-card"} asChild>
              <Pressable style={sharedStyles.button}>
                <Text
                  style={[
                    textStyles.text,
                    textStyles.captionsText,
                    textStyles.buttonText,
                  ]}
                >
                  See all
                </Text>
              </Pressable>
            </Link>
          </View>

          <EventDisplay />
        </View>
        {/* UPCOMMING EVENTS CAROUSEL (Repeated) */}
        <View style={textStyles.groupContainer}>
          <View style={[sharedStyles.informationRow]}>
            <Text style={[textStyles.text, textStyles.headingText]}>
              Today's DAILY OFFERS!
            </Text>
            {/* LINK VIEW MORE */}
            <Link href={"/(main-page)/daily-offer-card"} asChild>
              <Pressable style={sharedStyles.button}>
                <Text
                  style={[
                    textStyles.text,
                    textStyles.captionsText,
                    textStyles.buttonText,
                  ]}
                >
                  See all
                </Text>
              </Pressable>
            </Link>
          </View>

          <EventDisplay />
        </View>
        {/* DAILY OFFERS CAROUSEL */}
        <View style={textStyles.groupContainer}>
          <View style={[sharedStyles.informationRow]}>
            <Text style={[textStyles.text, textStyles.headingText]}>
              Today's DAILY OFFERS!
            </Text>
            {/* LINK VIEW MORE */}
            <Link href={"/(main-page)/daily-offer-card"} asChild>
              <Pressable style={sharedStyles.button}>
                <Text
                  style={[
                    textStyles.text,
                    textStyles.captionsText,
                    textStyles.buttonText,
                  ]}
                >
                  See all
                </Text>
              </Pressable>
            </Link>
          </View>

          <DailyOfferDisplay />
        </View>
      </ScrollView>
      <View style={{ height: footerHeight, marginBottom: insets.bottom }}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
