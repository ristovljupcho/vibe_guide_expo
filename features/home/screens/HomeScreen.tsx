import { useState, type ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { EventCard } from '@/features/events/components/EventCard';
import { useHomeData } from '@/features/home/hooks/useHomeData';
import { MapOverlay } from '@/features/places/components/MapOverlay';
import { PlaceCard } from '@/features/places/components/PlaceCard';
import { OfferCard } from '@/features/events/components/OfferCard';
import { useAppTheme } from '@/shared/theme/useAppTheme';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { FilterChip } from '@/shared/ui/FilterChip';
import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { SearchField } from '@/shared/ui/SearchField';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { bodyFontFamily, displayFontFamily, screenPadding } from '@/shared/ui/tokens';

const homeSectionPadding = 12;

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { data, isLoading } = useHomeData();
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const topPlaces = data?.topPlaces ?? [];
  const upcomingEvents = data?.upcomingEvents ?? [];
  const activeOffers = data?.activeOffers ?? [];
  const upcomingOffers = data?.upcomingOffers ?? [];

  const quickFilters = Array.from(
    new Set(topPlaces.flatMap((place) => place.topTraits ?? []).filter(Boolean)),
  ).slice(0, 8);

  const filteredTopPlaces = topPlaces.filter((place) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      place.name.toLowerCase().includes(normalizedQuery) ||
      place.description.toLowerCase().includes(normalizedQuery) ||
      (place.topTraits ?? []).some((trait) => trait.toLowerCase().includes(normalizedQuery));

    const matchesFilter =
      !selectedFilter ||
      (place.topTraits ?? []).some((trait) => trait.toLowerCase() === selectedFilter.toLowerCase());

    return matchesQuery && matchesFilter;
  });

  if (isLoading) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
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
          router.push({ pathname: '/place/[placeId]', params: { placeId } });
        }}
        places={[]}
        visible={showMap}
      />

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View style={[styles.stickyHeader, { backgroundColor: colors.background }]}>
          <ScreenHeader
            rightActions={
              <>
                <ActionIconButton icon="map-outline" onPress={() => setShowMap(true)} />
                <ActionIconButton icon="notifications-outline" />
              </>
            }
            subtitle={topPlaces[0]?.address ?? ''}
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
              showsHorizontalScrollIndicator={false}>
              {quickFilters.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  onPress={() =>
                    setSelectedFilter((current) => (current === filter ? null : filter))
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
            onPress={() => router.push('/explore')}
            title="Best Places">
            {filteredTopPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) => router.push({ pathname: '/place/[placeId]', params: { placeId } })}
                place={place}
              />
            ))}
          </Section>

          <Section title="Daily Offers">
            {activeOffers.map((offer) => (
              <OfferCard badge="Active" key={offer.id} offer={offer} />
            ))}
          </Section>

          <Section
            actionLabel="Explore events"
            onPress={() => router.push('/events')}
            title="Today's Events">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} type="Upcoming" />
            ))}
          </Section>

          <Section
            actionLabel="See all"
            onPress={() => router.push('/explore')}
            title="Trending Now">
            {filteredTopPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) => router.push({ pathname: '/place/[placeId]', params: { placeId } })}
                place={place}
              />
            ))}
          </Section>

          <Section
            actionLabel="See all"
            onPress={() => router.push('/explore')}
            title="Near You">
            {filteredTopPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                onPress={(placeId) => router.push({ pathname: '/place/[placeId]', params: { placeId } })}
                place={place}
              />
            ))}
          </Section>

          <View style={styles.footer}>
            <Text style={[styles.footerTitle, { color: colors.text }]}>
              Built for good nights out
            </Text>
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
              Save the spots you love, keep the places you want to try, and use the filters to find
              the right vibe faster.
            </Text>
          </View>

          <Section title="Upcoming Offers">
            {upcomingOffers.map((offer) => (
              <OfferCard badge="Upcoming" key={offer.id} offer={offer} />
            ))}
          </Section>
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
        <SectionHeader actionLabel={actionLabel} onPress={onPress} title={title} />
      </View>
      <ScrollView
        contentContainerStyle={styles.sectionContent}
        horizontal
        showsHorizontalScrollIndicator={false}>
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
    fontWeight: '600',
  },
  headerBody: {
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: screenPadding,
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
