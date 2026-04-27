import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getFavouritePlaces } from '@/api/favouritePlaceApi';
import { getVisitedPlaces } from '@/api/visitedPlaceApi';
import { getWishlistPlaces } from '@/api/wishlistPlaceApi';
import type { Place, SavedCollectionType } from '@/api/types';
import { SavedPlaceCard } from '@/features/places/components/SavedPlaceCard';
import { useAppTheme } from '@/shared/theme/useAppTheme';
import {
  bodyFontFamily,
  displayFontFamily,
  screenPadding,
} from '@/shared/ui/tokens';

type SavedCollections = Record<SavedCollectionType, Place[]>;

const emptyCollections: SavedCollections = {
  favorites: [],
  wishlist: [],
  visited: [],
};

const emptyStateEmoji: Record<SavedCollectionType, string> = {
  favorites: '❤️',
  wishlist: '🔖',
  visited: '✅',
};

export default function SavedScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [collections, setCollections] = useState<SavedCollections>(emptyCollections);
  const [activeTab, setActiveTab] = useState<SavedCollectionType>('favorites');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([getFavouritePlaces(), getWishlistPlaces(), getVisitedPlaces()]).then(
      ([favorites, wishlist, visited]) => {
        if (!mounted) {
          return;
        }

        setCollections({
          favorites,
          wishlist,
          visited,
        });
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
    };
  }, []);

  const tabs = [
    {
      id: 'favorites' as const,
      label: 'Favorites',
      count: collections.favorites.length,
    },
    {
      id: 'wishlist' as const,
      label: 'Wishlist',
      count: collections.wishlist.length,
    },
    {
      id: 'visited' as const,
      label: 'Visited',
      count: collections.visited.length,
    },
  ];

  const places = collections[activeTab];

  function handleRemove(placeId: string, collectionType: SavedCollectionType) {
    setCollections((current) => ({
      ...current,
      [collectionType]: current[collectionType].filter((place) => place.id !== placeId),
    }));
  }

  function handleUpdateNote(
    placeId: string,
    collectionType: SavedCollectionType,
    nextNote: string,
  ) {
    setCollections((current) => ({
      ...current,
      [collectionType]: current[collectionType].map((place) =>
        place.id === placeId
          ? {
              ...place,
              userNote: nextNote.trim() || undefined,
            }
          : place,
      ),
    }));
  }

  function handleViewProfile(place: Place) {
    router.push(`/place/${place.id}` as Href);
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View
          style={[
            styles.stickyHeader,
            {
              backgroundColor: `${colors.background}F2`,
              borderBottomColor: colors.border,
            },
          ]}>
          <View style={[styles.tabWrap, { paddingTop: insets.top + 12 }]}>
            <View style={styles.tabRow}>
              {tabs.map((tab) => {
                const selected = tab.id === activeTab;

                return (
                  <Pressable
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    style={({ pressed }) => [
                      styles.tabButton,
                      {
                        backgroundColor: selected ? colors.primary : colors.secondary,
                        opacity: pressed ? 0.9 : 1,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.tabLabel,
                        {
                          color: selected ? colors.primaryForeground : colors.text,
                        },
                      ]}>
                      {tab.label}
                      <Text
                        style={[
                          styles.tabCount,
                          {
                            color: selected
                              ? `${colors.primaryForeground}CC`
                              : `${colors.text}CC`,
                          },
                        ]}>
                        {' '}
                        ({tab.count})
                      </Text>
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : places.length === 0 ? (
            <View style={styles.emptyState}>
              <View
                style={[
                  styles.emptyIconWrap,
                  { backgroundColor: colors.secondary },
                ]}>
                <Text style={styles.emptyEmoji}>{emptyStateEmoji[activeTab]}</Text>
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No places yet</Text>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                Start exploring and save your favorite places to see them here
              </Text>
            </View>
          ) : (
            <View style={styles.cards}>
              {places.map((place) => (
                <SavedPlaceCard
                  key={place.id}
                  onRemove={handleRemove}
                  onUpdateNote={handleUpdateNote}
                  onViewProfile={handleViewProfile}
                  place={place}
                  type={activeTab}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 16,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyIconWrap: {
    alignItems: 'center',
    borderRadius: 999,
    height: 80,
    justifyContent: 'center',
    marginBottom: 16,
    width: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 252,
    textAlign: 'center',
  },
  emptyTitle: {
    fontFamily: displayFontFamily,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  screen: {
    flex: 1,
  },
  stickyHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tabCount: {
    fontSize: 12,
  },
  tabLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tabWrap: {
    paddingBottom: 14,
    paddingHorizontal: screenPadding,
  },
});
