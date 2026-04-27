import { useEffect, useRef, useState } from 'react';
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

import { getEventsPaginated } from '@/api/eventApi';
import { buildEvent } from '@/api/apiUtils';
import type { Event, EventsPage } from '@/api/types';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { DateInput } from '@/shared/ui/DateInput';
import { EventCard } from '@/features/events/components/EventCard';
import { FilterChip } from '@/shared/ui/FilterChip';
import { ModalSheet } from '@/shared/ui/ModalSheet';
import { SearchField } from '@/shared/ui/SearchField';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

const EMPTY_PAGE: EventsPage = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 10,
  last: true,
  first: true,
};

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function toStartDateTime(date: string) {
  return `${date}T00:00:00`;
}

function toEndDateTime(date: string) {
  return `${date}T23:59:59`;
}

function formatDateLabel(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface DateErrors {
  from: string;
  to: string;
}

function validateDates(from: string, to: string): DateErrors {
  const errors: DateErrors = { from: '', to: '' };

  if (!to) return errors;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const toDate = new Date(`${to}T00:00:00`);

  if (toDate < today) {
    errors.to = 'End date cannot be in the past.';
    return errors;
  }

  if (from) {
    const fromDate = new Date(`${from}T00:00:00`);
    if (toDate < fromDate) {
      errors.to = 'End date cannot be before the start date.';
    }
  }

  return errors;
}

export default function EventsScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [query, setQuery] = useState('');

  // Pending state — lives inside the filter modal until Apply is clicked.
  const [pendingFrom, setPendingFrom] = useState('');
  const [pendingTo, setPendingTo] = useState('');
  const [pendingErrors, setPendingErrors] = useState<DateErrors>({ from: '', to: '' });

  // Applied state — drives the actual fetch.
  const [appliedFrom, setAppliedFrom] = useState('');
  const [appliedTo, setAppliedTo] = useState('');

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState<EventsPage>(EMPTY_PAGE);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce query so we don't fire on every keystroke.
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Reset to page 0 whenever filters or search change.
  useEffect(() => {
    setPage(0);
  }, [debouncedQuery, appliedFrom, appliedTo]);

  // Fetch whenever page or applied filters change.
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getEventsPaginated({
      placeName: debouncedQuery || undefined,
      startDate: appliedFrom ? toStartDateTime(appliedFrom) : undefined,
      endDate: appliedTo ? toEndDateTime(appliedTo) : undefined,
      page,
    }).then((data) => {
      if (!mounted) return;
      setPageData(data);
      setLoading(false);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      mounted = false;
    };
  }, [debouncedQuery, appliedFrom, appliedTo, page]);

  const events: Event[] = pageData.content.map((dto) => buildEvent(dto, 'Active'));

  // --- Pending filter handlers ---

  function handlePendingFromChange(value: string) {
    setPendingFrom(value);
    setPendingErrors(validateDates(value, pendingTo));
  }

  function handlePendingToChange(value: string) {
    setPendingTo(value);
    setPendingErrors(validateDates(pendingFrom, value));
  }

  function openFilters() {
    setPendingFrom(appliedFrom);
    setPendingTo(appliedTo);
    setPendingErrors({ from: '', to: '' });
    setShowFilters(true);
  }

  function closeFilters() {
    setPendingFrom(appliedFrom);
    setPendingTo(appliedTo);
    setPendingErrors({ from: '', to: '' });
    setShowFilters(false);
  }

  function applyFilters() {
    const errors = validateDates(pendingFrom, pendingTo);
    if (errors.from || errors.to) {
      setPendingErrors(errors);
      return;
    }
    setAppliedFrom(pendingFrom);
    setAppliedTo(pendingTo);
    setShowFilters(false);
  }

  function clearPending() {
    setPendingFrom('');
    setPendingTo('');
    setPendingErrors({ from: '', to: '' });
  }

  function removeAppliedFrom() {
    setAppliedFrom('');
    setPendingFrom('');
  }

  function removeAppliedTo() {
    setAppliedTo('');
    setPendingTo('');
  }

  const hasActiveFilters = Boolean(appliedFrom || appliedTo);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ModalSheet
        footer={
          <View style={styles.modalFooter}>
            <Pressable
              onPress={clearPending}
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
        title="Event Filters"
        visible={showFilters}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.modalContent}>
            <DateInput
              error={pendingErrors.from}
              label="From Date"
              onChange={handlePendingFromChange}
              value={pendingFrom}
            />
            <DateInput
              error={pendingErrors.to}
              label="To Date"
              min={pendingFrom || todayString()}
              onChange={handlePendingToChange}
              value={pendingTo}
            />
          </View>
        </ScrollView>
      </ModalSheet>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View
          style={[
            styles.stickyHeader,
            { backgroundColor: colors.background, borderBottomColor: colors.border },
          ]}>
          <View style={[styles.headerTools, { paddingTop: insets.top + 12 }]}>
            <View style={styles.searchWrap}>
              <SearchField onChangeText={setQuery} placeholder="Search by place name..." value={query} />
            </View>
            <ActionIconButton
              active={showFilters || hasActiveFilters}
              icon="options-outline"
              onPress={openFilters}
            />
          </View>

          {hasActiveFilters ? (
            <ScrollView
              contentContainerStyle={styles.activeFilters}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {appliedFrom ? (
                <FilterChip
                  label={`From: ${formatDateLabel(appliedFrom)}`}
                  onRemove={removeAppliedFrom}
                  selected
                />
              ) : null}
              {appliedTo ? (
                <FilterChip
                  label={`To: ${formatDateLabel(appliedTo)}`}
                  onRemove={removeAppliedTo}
                  selected
                />
              ) : null}
            </ScrollView>
          ) : null}
        </View>

        <View style={styles.results}>
          <View style={styles.resultsHeader}>
            <Ionicons color={colors.mutedForeground} name="calendar-outline" size={14} />
            <Text style={[styles.resultsText, { color: colors.mutedForeground }]}>
              {loading ? 'Loading events...' : `${pageData.totalElements} events found`}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : events.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No events match your filters.
            </Text>
          ) : (
            <View style={styles.cards}>
              {events.map((event) => (
                <EventCard key={event.id} compact event={event} />
              ))}
            </View>
          )}

          {!loading && pageData.totalPages > 1 ? (
            <View style={[styles.pagination, { borderTopColor: colors.border }]}>
              <Pressable
                disabled={pageData.first}
                onPress={() => setPage((p) => p - 1)}
                style={({ pressed }) => [
                  styles.pageButton,
                  {
                    backgroundColor: colors.secondary,
                    opacity: pageData.first ? 0.4 : pressed ? 0.8 : 1,
                  },
                ]}>
                <Ionicons color={colors.text} name="chevron-back" size={18} />
              </Pressable>

              <Text style={[styles.pageLabel, { color: colors.text }]}>
                Page {pageData.number + 1} of {pageData.totalPages}
              </Text>

              <Pressable
                disabled={pageData.last}
                onPress={() => setPage((p) => p + 1)}
                style={({ pressed }) => [
                  styles.pageButton,
                  {
                    backgroundColor: colors.secondary,
                    opacity: pageData.last ? 0.4 : pressed ? 0.8 : 1,
                  },
                ]}>
                <Ionicons color={colors.text} name="chevron-forward" size={18} />
              </Pressable>
            </View>
          ) : null}
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
  emptyText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    paddingVertical: 32,
    textAlign: 'center',
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
    gap: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  pageButton: {
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  pageLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  pagination: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 16,
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
