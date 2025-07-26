import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import DailyOfferDisplay from "./daily-offers-display";
import EventDisplay from "./events-display";
import QuickSearch from "./quick-search";
import Footer from "../(shared-components)/footer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sharedStyles } from "@/styles/sharedStyles";
import { textStyles } from "@/styles/textStyles";
import logo from "../../assets/icons/logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const footerHeight = 60;
  const headerHeight = 50 + insets.top; // Dynamic header height including status bar

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Header Section */}
      <View
        style={[
          styles.header,
          { height: headerHeight, paddingTop: insets.top },
        ]}
      >
        <Image source={logo} resizeMode="contain" style={styles.appLogo} />
        <View style={styles.headerIcons}>
          <Ionicons name="menu" size={24} color="white" />
        </View>
      </View>

      <ScrollView
        style={sharedStyles.mainContainer}
        contentContainerStyle={{
          paddingBottom: footerHeight,
          minHeight:
            screenHeight -
            insets.top -
            insets.bottom -
            footerHeight -
            headerHeight, // Subtract dynamic header height
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuickSearch />
        {/* UPCOMING EVENTS CAROUSEL */}
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
        {/* UPCOMING EVENTS CAROUSEL (Repeated) */}
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
        {/* UPCOMING EVENTS CAROUSEL (Repeated) */}
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

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  appLogo: {
    resizeMode: "contain",
    height: 30,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  headerIcon: {
    fontSize: 20,
  },
});
