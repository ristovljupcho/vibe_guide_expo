import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import DailyOfferDisplay from "./daily-offers-display";
import EventDisplay from "./events-display";
// Styles
import { textStyles } from "@/styles/textStyles";

export default function MainPage() {
  return (
    <ScrollView
      className="bg-slate-800 pt-10"
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: "flex-start", // align content to start horizontally
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* UPCOMMING EVENTS CAROUSEL */}
      <View style={textStyles.groupContainer}>
        <Text
          style={[textStyles.text, textStyles.headingText]}
          className="self-center mb-2"
        >
          Upcomming events!
        </Text>

        <EventDisplay />

        {/* LINK VIEW MORE */}
        <View style={textStyles.suggestionText}>
          <Text style={[textStyles.text, textStyles.captionsText]}>
            Not finding what you need?{" "}
          </Text>

          <Link href={"/(main-page)/daily-offer-card"} asChild>
            <Pressable>
              <Text
                style={[
                  textStyles.text,
                  textStyles.captionsText,
                  textStyles.boldText,
                ]}
              >
                View more!
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
      {/* DAILY OFFERS CAROUSEL */}
      <View style={textStyles.groupContainer}>
        <Text
          style={[textStyles.text, textStyles.headingText]}
          className="self-center mb-2"
        >
          Today's DAILY OFFERS!
        </Text>

        <DailyOfferDisplay />

        <View style={textStyles.suggestionText}>
          <Text style={[textStyles.text, textStyles.captionsText]}>
            Not finding what you need?{" "}
          </Text>

          {/* LINK VIEW MORE */}
          <Link href={"/(main-page)/daily-offer-card"} asChild>
            <Pressable>
              <Text
                style={[
                  textStyles.text,
                  textStyles.captionsText,
                  textStyles.boldText,
                ]}
              >
                View more!
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
