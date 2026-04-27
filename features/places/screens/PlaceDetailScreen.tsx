import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchJson } from '@/api/apiClient';
import { formatEnumLabel, mapPriceLevel } from '@/api/apiUtils';
import type {
  EventResponseDto,
  OfferResponseDto,
  PlaceResponseDto,
  TraitCarouselResponseDto,
} from '@/api/types';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { EventCard } from '@/features/events/components/EventCard';
import { OfferCard } from '@/features/events/components/OfferCard';
import {
  bodyFontFamily,
  displayFontFamily,
  screenPadding,
} from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function PlaceDetailScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<PlaceResponseDto | null>(null);
  const [traits, setTraits] = useState<TraitCarouselResponseDto[]>([]);
  const [activeEvents, setActiveEvents] = useState<EventResponseDto[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventResponseDto[]>([]);
  const [activeOffers, setActiveOffers] = useState<OfferResponseDto[]>([]);
  const [upcomingOffers, setUpcomingOffers] = useState<OfferResponseDto[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [visited, setVisited] = useState(false);
  const [traitsTrackWidth, setTraitsTrackWidth] = useState(0);
  const traitsTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      const [placeRes, traitsRes, activeEventsRes, upcomingEventsRes, activeOffersRes, upcomingOffersRes] =
        await Promise.all([
          fetchJson<PlaceResponseDto>(`/places/${String(placeId)}`),
          fetchJson<TraitCarouselResponseDto[]>(`/places/${String(placeId)}/traits/carousel`, undefined, {
            suppressErrors: true,
          }),
          fetchJson<EventResponseDto[]>(`/events/active/${String(placeId)}`, undefined, {
            suppressErrors: true,
          }),
          fetchJson<EventResponseDto[]>(`/events/upcoming/${String(placeId)}`, undefined, {
            suppressErrors: true,
          }),
          fetchJson<OfferResponseDto[]>(`/offers/active/${String(placeId)}`, undefined, {
            suppressErrors: true,
          }),
          fetchJson<OfferResponseDto[]>(`/offers/upcoming/${String(placeId)}`, undefined, {
            suppressErrors: true,
          }),
        ]);

      if (!mounted) {
        return;
      }

      setPlace(placeRes);
      setTraits(traitsRes ?? []);
      setActiveEvents(activeEventsRes ?? []);
      setUpcomingEvents(upcomingEventsRes ?? []);
      setActiveOffers(activeOffersRes ?? []);
      setUpcomingOffers(upcomingOffersRes ?? []);
      setLoading(false);
    }

    load();

    return () => {
      mounted = false;
    };
  }, [placeId]);

  useEffect(() => {
    if (!place || traitsTrackWidth === 0 || traits.length === 0) {
      return undefined;
    }

    traitsTranslateX.setValue(0);

    const animation = Animated.loop(
      Animated.timing(traitsTranslateX, {
        toValue: -(traitsTrackWidth / 3),
        duration: Math.max(14000, traits.map((trait) => trait.name).join('').length * 260),
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [place, traits, traitsTrackWidth, traitsTranslateX]);

  if (loading) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>Unable to load place.</Text>
      </View>
    );
  }

  const traitNames = traits.map((trait) => trait.name);
  const traitsTrack = [...traitNames, ...traitNames, ...traitNames];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.floatingHeader,
          {
            backgroundColor: showHeaderTitle ? `${colors.background}F4` : 'transparent',
            borderBottomColor: showHeaderTitle ? colors.border : 'transparent',
            paddingTop: insets.top + 10,
          },
        ]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: colors.secondary,
              opacity: pressed ? 0.82 : 1,
            },
          ]}>
          <Ionicons color={colors.text} name="chevron-back" size={20} />
        </Pressable>

        <View style={styles.headerTitleSlot}>
          {showHeaderTitle ? (
            <Text numberOfLines={2} style={[styles.headerTitle, { color: colors.text }]}>
              {place.name}
            </Text>
          ) : null}
        </View>

        <View style={styles.headerActions}>
          <ActionIconButton active={favorite} activeColor={colors.primary} icon={favorite ? 'heart' : 'heart-outline'} onPress={() => setFavorite((current) => !current)} size={40} />
          <ActionIconButton active={wishlist} activeColor={colors.accent} icon={wishlist ? 'bookmark' : 'bookmark-outline'} onPress={() => setWishlist((current) => !current)} size={40} />
          <ActionIconButton active={visited} activeColor={colors.success} icon={visited ? 'location' : 'location-outline'} onPress={() => setVisited((current) => !current)} size={40} />
        </View>
      </View>

      <ScrollView
        onScroll={(event) => setShowHeaderTitle(event.nativeEvent.contentOffset.y > 200)}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={{ height: insets.top + 82 }} />

        <View
          style={[
            styles.titleSection,
            { borderBottomColor: `${colors.border}80` },
          ]}>
          <Text style={[styles.placeTitle, { color: colors.text }]}>{place.name}</Text>
          <Text style={[styles.placeSubtitle, { color: colors.mutedForeground }]}>
            {place.address}
          </Text>
        </View>

        <View
          style={[
            styles.gallerySection,
            { borderBottomColor: `${colors.border}80` },
          ]}>
          <ScrollView
            contentContainerStyle={styles.galleryContent}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {place.imageUrls.map((image, index) => (
              <Image
                key={`${place.name}-${index}`}
                contentFit="cover"
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={[
            styles.traitsSection,
            { borderBottomColor: `${colors.border}80` },
          ]}>
          <Animated.View
            onLayout={(event) => setTraitsTrackWidth(event.nativeEvent.layout.width)}
            style={[
              styles.traitsTrack,
              {
                transform: [{ translateX: traitsTranslateX }],
              },
            ]}>
            {traitsTrack.map((trait, index) => (
              <Text
                key={`${trait}-${index}`}
                style={[styles.traitText, { color: colors.text }]}>
                {trait}
              </Text>
            ))}
          </Animated.View>
        </View>

        <View style={styles.body}>
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}>
            <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
              <View style={styles.infoItem}>
                <Ionicons color={colors.primary} name="star" size={18} />
                <Text style={[styles.infoValue, { color: colors.text }]}>{place.rating ?? 4.5}</Text>
              </View>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
                {formatEnumLabel(place.primaryType)}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {mapPriceLevel(place.priceLevel) ?? '$$'}
              </Text>
            </View>

            <Text style={[styles.description, { color: colors.text }]}>
              {expanded ? place.description : truncate(place.description, 120)}
            </Text>
            {place.description.length > 120 ? (
              <Pressable onPress={() => setExpanded((current) => !current)} style={styles.readMoreButton}>
                <Text style={[styles.readMoreText, { color: colors.primary }]}>
                  {expanded ? 'Show less' : 'Read more'}
                </Text>
                <Ionicons
                  color={colors.primary}
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                />
              </Pressable>
            ) : null}
          </View>

          <ContentSection title="Active Events" titleColor={colors.text}>
            {activeEvents.map((event) => (
              <EventCard key={event.id} event={event} type="Active" />
            ))}
          </ContentSection>

          <ContentSection title="Daily Offers" titleColor={colors.text}>
            {activeOffers.map((offer) => (
              <OfferCard badge="Active" key={offer.id} offer={offer} />
            ))}
          </ContentSection>

          <ContentSection title="Upcoming Events" titleColor={colors.text}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} type="Upcoming" />
            ))}
          </ContentSection>

          <ContentSection title="Upcoming Offers" titleColor={colors.text}>
            {upcomingOffers.map((offer) => (
              <OfferCard badge="Upcoming" key={offer.id} offer={offer} />
            ))}
          </ContentSection>
        </View>
      </ScrollView>
    </View>
  );
}

function ContentSection({
  title,
  children,
  titleColor,
}: {
  title: string;
  children: ReactNode[];
  titleColor: string;
}) {
  if (children.length === 0) {
    return null;
  }

  return (
    <View style={styles.contentSection}>
      <Text style={[styles.contentSectionTitle, { color: titleColor }]}>{title}</Text>
      <ScrollView
        contentContainerStyle={styles.sectionScroll}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  body: {
    paddingBottom: 32,
  },
  contentSection: {
    gap: 14,
    paddingVertical: 16,
  },
  contentSectionTitle: {
    fontFamily: displayFontFamily,
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: screenPadding,
  },
  description: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
  floatingHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 12,
    left: 0,
    paddingBottom: 12,
    paddingHorizontal: 16,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 20,
  },
  gallerySection: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
  },
  galleryContent: {
    gap: 14,
    paddingHorizontal: screenPadding,
  },
  galleryImage: {
    borderRadius: 22,
    height: 208,
    width: 288,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerTitleSlot: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 6,
  },
  headerTitle: {
    fontFamily: displayFontFamily,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: 22,
    flexShrink: 1,
    textTransform: 'uppercase',
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 24,
    gap: 16,
    marginHorizontal: screenPadding,
    padding: 20,
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  infoLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  infoRow: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
  },
  infoValue: {
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '700',
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  placeSubtitle: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    marginTop: 8,
    letterSpacing: 0.6,
  },
  placeTitle: {
    fontFamily: displayFontFamily,
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 4.5,
    lineHeight: 40,
    maxWidth: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  readMoreButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  readMoreText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  screen: {
    flex: 1,
  },
  sectionScroll: {
    gap: 14,
    paddingHorizontal: screenPadding,
  },
  titleSection: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    width: '100%',
  },
  traitsSection: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingVertical: 16,
  },
  traitText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.1,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
  },
  traitsTrack: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    paddingRight: 16,
  },
});
