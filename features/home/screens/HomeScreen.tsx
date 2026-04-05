import { useRouter, type Href } from "expo-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  getAllPlaces,
  getHomeFeed,
  type HomeFeed,
  type VibePlace,
} from "@/api";
import { EventCard } from "@/features/events/components/EventCard";
import { OfferCard } from "@/features/events/components/OfferCard";
import { MapOverlay } from "@/features/places/components/MapOverlay";
import { PlaceCard } from "@/features/places/components/PlaceCard";
import { useAppTheme } from "@/shared/theme/useAppTheme";
import { ActionIconButton } from "@/shared/ui/ActionIconButton";
import { FilterChip } from "@/shared/ui/FilterChip";
import { ScreenHeader } from "@/shared/ui/ScreenHeader";
import { SearchField } from "@/shared/ui/SearchField";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import {
  bodyFontFamily,
  displayFontFamily,
  screenPadding,
} from "@/shared/ui/tokens";

const homeSectionPadding = 12;

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [feed, setFeed] = useState<HomeFeed | null>(null);
  const [allPlaces, setAllPlaces] = useState<VibePlace[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [homeFeed, placeList] = await Promise.all([
        getHomeFeed(),
        getAllPlaces(),
      ]);

      if (!mounted) {
        return;
      }

      setFeed(homeFeed);
      setAllPlaces(placeList);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!feed) {
    return (
      <View
        style={[styles.loadingWrap, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <MapOverlay
        onClose={() => setShowMap(false)}
        onSelectPlace={(placeId) => {
          setShowMap(false);
          router.push({
            pathname: "/place/[placeId]",
            params: { placeId },
          } as unknown as Href);
        }}
        places={allPlaces}
        visible={showMap}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View
          style={[styles.stickyHeader, { backgroundColor: colors.background }]}
        >
          <ScreenHeader
            rightActions={
              <>
                <ActionIconButton
                  icon="map-outline"
                  onPress={() => setShowMap(true)}
                />
                <ActionIconButton icon="notifications-outline" />
              </>
            }
            subtitle={feed.locationLabel}
            title="VibeGuide"
          />

          <View style={styles.headerBody}>
            <SearchField
              onChangeText={setSearchQuery}
              placeholder="Search places, drinks, food, vibes..."
              value={searchQuery}
            />
            <ScrollView
              contentContainerStyle={styles.quickFilters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {feed.quickFilters.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  onPress={() =>
                    setSelectedFilter((current) =>
                      current === filter ? null : filter,
                    )
                  }
                  selected={selectedFilter === filter}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.sections}>
          <Section
            actionLabel="See all"
            onPress={() => router.push("/explore" as Href)}
            title="Best Places"
          >
            {feed.featuredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) =>
                  router.push({
                    pathname: "/place/[placeId]",
                    params: { placeId },
                  } as unknown as Href)
                }
                place={place}
              />
            ))}
          </Section>

          <Section title="Daily Offers">
            {feed.dailyOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </Section>

          <Section
            actionLabel="Explore events"
            onPress={() => router.push("/events" as Href)}
            title="Today's Events"
          >
            {feed.todayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Section>

          <Section
            actionLabel="See all"
            onPress={() => router.push("/explore" as Href)}
            title="Trending Now"
          >
            {feed.trendingPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) =>
                  router.push({
                    pathname: "/place/[placeId]",
                    params: { placeId },
                  } as unknown as Href)
                }
                place={place}
              />
            ))}
          </Section>

          <Section
            actionLabel="See all"
            onPress={() => router.push("/explore" as Href)}
            title="Near You"
          >
            {feed.nearbyPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) =>
                  router.push({
                    pathname: "/place/[placeId]",
                    params: { placeId },
                  } as unknown as Href)
                }
                place={place}
              />
            ))}
          </Section>

          <View style={styles.footer}>
            <Text style={[styles.footerTitle, { color: colors.text }]}>
              Built for good nights out
            </Text>
            <Text
              style={[styles.footerText, { color: colors.mutedForeground }]}
            >
              Save the spots you love, keep the places you want to try, and use
              the filters to find the right vibe faster.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  children,
  actionLabel,
  onPress,
}: {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderWrap}>
        <SectionHeader
          actionLabel={actionLabel}
          onPress={onPress}
          title={title}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.sectionContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: 8,
    paddingBottom: 28,
    paddingHorizontal: homeSectionPadding,
  },
  footerText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
  footerTitle: {
    fontFamily: displayFontFamily,
    fontSize: 20,
    fontWeight: "600",
  },
  headerBody: {
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: screenPadding,
  },
  loadingWrap: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  quickFilters: {
    gap: 10,
    paddingRight: screenPadding,
  },
  screen: {
    flex: 1,
  },
  section: {
    gap: 14,
  },
  sectionHeaderWrap: {
    paddingHorizontal: homeSectionPadding,
  },
  sectionContent: {
    gap: 14,
    paddingHorizontal: 0,
  },
  sections: {
    gap: 28,
    paddingTop: 18,
  },
  stickyHeader: {
    zIndex: 10,
  },
});
