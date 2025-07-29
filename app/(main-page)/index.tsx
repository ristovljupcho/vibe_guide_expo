import { ScrollView, View, SafeAreaView, Dimensions } from "react-native";
import Footer from "../(shared-components)/footer";
import { sharedStyles } from "@/styles/sharedStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CarouselSection from "./carousel-section";
import { CardProps } from "./card";
import QuickSearch from "./quick-search";

// Events
const events: CardProps[] = [
  {
    eventName: "Oktoberfest",
    placeName: "Bavarian Biergarten",
    description:
      "Celebrate Oktoberfest with authentic German beers, bratwurst, and live oompah bands.",
    startDate: "2025-10-04T16:00:00",
    endDate: "2025-10-04T23:00:00",
    image: require("@/app/data/images/oktoberfest.webp"),
  },
  {
    eventName: "Halloween Party",
    placeName: "Spooky Manor",
    description:
      "Haunted Halloween bash with costume contests, themed cocktails, and eerie decorations.",
    startDate: "2025-10-31T20:00:00",
    endDate: "2025-11-01T02:00:00",
    image: require("@/app/data/images/halloween.jpg"),
  },
  {
    eventName: "Cocktail Party",
    placeName: "The Mixology Lounge",
    description:
      "Elegant cocktail party featuring craft cocktails, live jazz, and hors d'oeuvres.",
    startDate: "2025-11-01T19:00:00",
    endDate: "2025-11-01T23:00:00",
    image: require("@/app/data/images/cocktail-party.jpg"),
  },
];

// Offers
const offers: CardProps[] = [
  {
    placeName: "Bavarian Biergarten",
    description:
      "Celebrate Oktoberfest with authentic German beers, bratwurst, and live oompah bands.",
    startDate: "2025-10-04T16:00:00",
    endDate: "2025-10-04T23:00:00",
    image: require("@/app/data/images/oktoberfest.webp"),
  },
  {
    placeName: "Spooky Manor",
    description:
      "Haunted Halloween bash with costume contests, themed cocktails, and eerie decorations.",
    startDate: "2025-10-31T20:00:00",
    endDate: "2025-11-01T02:00:00",
    image: require("@/app/data/images/halloween.jpg"),
  },
  {
    placeName: "The Mixology Lounge",
    description:
      "Elegant cocktail party featuring craft cocktails, live jazz, and hors d'oeuvres.",
    startDate: "2025-11-01T19:00:00",
    endDate: "2025-11-01T23:00:00",
    image: require("@/app/data/images/cocktail-party.jpg"),
  },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const footerHeight = 60;

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
          paddingBottom: footerHeight,
          minHeight: screenHeight - insets.top - insets.bottom - footerHeight,
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuickSearch />

        {/* Offers */}
        <CarouselSection
          title="Today's Offers"
          buttonLink="/(main-page)/daily-offer-card"
          cards={offers}
        />
        {/* Events */}
        <CarouselSection
          title="Upcomming Events"
          buttonLink="/(main-page)/daily-offer-card"
          cards={events}
        />
      </ScrollView>
      <View style={{ height: footerHeight, marginBottom: insets.bottom }}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
