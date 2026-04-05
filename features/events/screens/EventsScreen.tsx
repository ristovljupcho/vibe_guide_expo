import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  getEventDateFilters,
  getEvents,
  getEventTypes,
  type EventDateFilter,
  type VibeEvent,
} from '@/api';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { EventCard } from '@/features/events/components/EventCard';
import { FilterChip } from '@/shared/ui/FilterChip';
import { ModalSheet } from '@/shared/ui/ModalSheet';
import { SearchField } from '@/shared/ui/SearchField';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function EventsScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState<VibeEvent[]>([]);
  const [query, setQuery] = useState('');
  const [dateFilters, setDateFilters] = useState<EventDateFilter[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<EventDateFilter>('Today');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([getEventDateFilters(), getEventTypes()]).then(([dates, types]) => {
      if (!mounted) {
        return;
      }

      setDateFilters(dates);
      setEventTypes(types);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getEvents(query, selectedDate, selectedType).then((items) => {
      if (!mounted) {
        return;
      }

      setEvents(items);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [query, selectedDate, selectedType]);

  const hasActiveFilters = selectedDate !== 'Today' || selectedType !== 'All';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ModalSheet
        footer={
          <View style={styles.modalFooter}>
            <Pressable
              onPress={() => {
                setSelectedDate('Today');
                setSelectedType('All');
              }}
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
        title="Event Filters"
        visible={showFilters}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={[styles.modalSectionTitle, { color: colors.text }]}>Date</Text>
              <View style={styles.filterWrap}>
                {dateFilters.map((filter) => (
                  <FilterChip
                    key={filter}
                    label={filter}
                    onPress={() => setSelectedDate(filter)}
                    selected={selectedDate === filter}
                  />
                ))}
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={[styles.modalSectionTitle, { color: colors.text }]}>Event Type</Text>
              <View style={styles.filterWrap}>
                {eventTypes.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    onPress={() => setSelectedType(type)}
                    selected={selectedType === type}
                    tone="accent"
                  />
                ))}
              </View>
            </View>
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
              <SearchField onChangeText={setQuery} placeholder="Search events..." value={query} />
            </View>
            <ActionIconButton
              active={showFilters || hasActiveFilters}
              icon="options-outline"
              onPress={() => setShowFilters((current) => !current)}
            />
          </View>

          {hasActiveFilters ? (
            <ScrollView
              contentContainerStyle={styles.activeFilters}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {selectedDate !== 'Today' ? (
                <FilterChip label={selectedDate} onPress={() => setSelectedDate('Today')} selected />
              ) : null}
              {selectedType !== 'All' ? (
                <FilterChip
                  label={selectedType}
                  onPress={() => setSelectedType('All')}
                  selected
                  tone="accent"
                />
              ) : null}
            </ScrollView>
          ) : null}
        </View>

        <View style={styles.results}>
          <View style={styles.resultsHeader}>
            <Ionicons color={colors.mutedForeground} name="calendar-outline" size={14} />
            <Text style={[styles.resultsText, { color: colors.mutedForeground }]}>
              {loading ? 'Loading events...' : `${events.length} events found`}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : (
            <View style={styles.cards}>
              {events.map((event) => (
                <EventCard key={event.id} compact event={event} />
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
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  resultsHeader: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 8,
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
