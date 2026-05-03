import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useExploreFilters, useExplorePlaces } from '@/features/explore/hooks/useExploreData';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { FilterChip } from '@/shared/ui/FilterChip';
import { ModalSheet } from '@/shared/ui/ModalSheet';
import { PlaceCard } from '@/features/places/components/PlaceCard';
import { SearchField } from '@/shared/ui/SearchField';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function ExploreScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  // What the user is toggling inside the modal (not yet submitted).
  const [pendingFilters, setPendingFilters] = useState<string[]>([]);
  // What was last applied — drives the actual fetch.
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const [showFilters, setShowFilters] = useState(false);

  const { data: filterCategories = [] } = useExploreFilters();
  const { data: allPlaces = [], isLoading: loading } = useExplorePlaces(appliedFilters);

  // Client-side text filter — no network call.
  const results = query.trim()
    ? allPlaces.filter((place) => {
        const q = query.trim().toLowerCase();
        return (
          place.name.toLowerCase().includes(q) ||
          place.description.toLowerCase().includes(q) ||
          (place.topTraits ?? []).some((trait) => trait.toLowerCase().includes(q))
        );
      })
    : allPlaces;

  function togglePending(filter: string) {
    setPendingFilters((current) =>
      current.includes(filter) ? current.filter((f) => f !== filter) : [...current, filter],
    );
  }

  function applyFilters() {
    setAppliedFilters(pendingFilters);
    setShowFilters(false);
  }

  function clearFilters() {
    setPendingFilters([]);
  }

  function openFilters() {
    // Seed pending with whatever is currently applied so the modal reflects the active state.
    setPendingFilters(appliedFilters);
    setShowFilters(true);
  }

  function closeFilters() {
    // Discard any in-modal changes that weren't applied.
    setPendingFilters(appliedFilters);
    setShowFilters(false);
  }

  function removeAppliedFilter(filter: string) {
    const next = appliedFilters.filter((f) => f !== filter);
    setAppliedFilters(next);
    setPendingFilters(next);
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ModalSheet
        footer={
          <View style={styles.modalFooter}>
            <Pressable
              onPress={clearFilters}
              style={({ pressed }) => [
                styles.footerButton,
                { backgroundColor: colors.secondary, opacity: pressed ? 0.82 : 1 },
              ]}>
              <Text style={[styles.footerButtonText, { color: colors.text }]}>Clear All</Text>
            </Pressable>
            <Pressable
              onPress={applyFilters}
              style={({ pressed }) => [
                styles.footerButton,
                { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 },
              ]}>
              <Text style={[styles.footerButtonText, { color: colors.primaryForeground }]}>
                Apply Filters
              </Text>
            </Pressable>
          </View>
        }
        onClose={closeFilters}
        title="Filters"
        visible={showFilters}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalContent}>
            {filterCategories.map((category) => (
              <View key={category.name} style={styles.modalSection}>
                <Text style={[styles.modalSectionTitle, { color: colors.text }]}>{category.name}</Text>
                <View style={styles.filterWrap}>
                  {category.options.map((option) => (
                    <FilterChip
                      key={option}
                      label={option}
                      onPress={() => togglePending(option)}
                      selected={pendingFilters.includes(option)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ModalSheet>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View
          style={[
            styles.stickyHeader,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}>
          <View style={[styles.headerTools, { paddingTop: insets.top + 12 }]}>
            <View style={styles.searchWrap}>
              <SearchField onChangeText={setQuery} placeholder="Search places..." value={query} />
            </View>
            <ActionIconButton
              active={showFilters || appliedFilters.length > 0}
              icon="options-outline"
              onPress={openFilters}
            />
          </View>

          {appliedFilters.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.activeFilters}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {appliedFilters.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  onRemove={() => removeAppliedFilter(filter)}
                  selected
                />
              ))}
            </ScrollView>
          ) : null}
        </View>

        <View style={styles.results}>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsText, { color: colors.mutedForeground }]}>
              {loading ? 'Searching places...' : `${results.length} places found`}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : (
            <View style={styles.cards}>
              {results.map((place) => (
                <PlaceCard
                  key={place.id}
                  compact
                  onPress={(placeId) => router.push({ pathname: '/place/[placeId]', params: { placeId } })}
                  place={place}
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
  activeFilters: {
    gap: 10,
    paddingBottom: 12,
    paddingHorizontal: screenPadding,
  },
  cards: {
    alignItems: 'center',
    gap: 14,
    width: '100%',
  },
  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  footerButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  footerButtonText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  headerTools: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 12,
    paddingHorizontal: screenPadding,
  },
  modalContent: {
    gap: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  modalSection: {
    gap: 12,
  },
  modalSectionTitle: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  results: {
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
    paddingBottom: 28,
  },
  resultsHeader: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  resultsText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
  },
  screen: {
    flex: 1,
  },
  searchWrap: {
    flex: 1,
  },
  stickyHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
  },
});
