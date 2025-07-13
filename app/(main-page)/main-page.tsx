import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import DailyOfferDisplay from "./daily-offers-display";
import EventDisplay from "./events-display";
// Styles
import { textStyles } from "@/styles/textStyles";
import { sharedStyles } from "@/styles/sharedStyles";

export default function MainPage() {
  return (
    <ScrollView
      style={sharedStyles.mainContainer}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "flex-start",
      }}
      showsVerticalScrollIndicator={false}
    >
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
  );
}
