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

import { getExploreFilters, searchPlaces, type FilterCategory, type VibePlace } from '@/api';
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
  const [results, setResults] = useState<VibePlace[]>([]);
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getExploreFilters().then((categories) => {
      if (mounted) {
        setFilterCategories(categories);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    searchPlaces(query, selectedFilters).then((places) => {
      if (!mounted) {
        return;
      }

      setResults(places);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [query, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ModalSheet
        footer={
          <View style={styles.modalFooter}>
            <Pressable
              onPress={() => setSelectedFilters([])}
              style={({ pressed }) => [
                styles.footerButton,
                { backgroundColor: colors.secondary, opacity: pressed ? 0.82 : 1 },
              ]}>
              <Text style={[styles.footerButtonText, { color: colors.text }]}>Clear All</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowFilters(false)}
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
        onClose={() => setShowFilters(false)}
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
                      onPress={() => toggleFilter(option)}
                      selected={selectedFilters.includes(option)}
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
              active={showFilters || selectedFilters.length > 0}
              icon="options-outline"
              onPress={() => setShowFilters((current) => !current)}
            />
          </View>

          {selectedFilters.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.activeFilters}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {selectedFilters.map((filter) => (
                <FilterChip key={filter} label={filter} onPress={() => toggleFilter(filter)} selected />
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
                  onPress={(placeId) =>
                    router.push({
                      pathname: '/place/[placeId]',
                      params: { placeId },
                    } as unknown as Href)
                  }
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
