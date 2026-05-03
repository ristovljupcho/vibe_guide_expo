import { encodePathSegment, fetchJson } from './apiClient';
import { buildEvent, matchesSearch } from './apiUtils';
import type { Event, EventDateFilter, EventResponseDto, EventsPage } from './types';

const EVENTS_PAGE_SIZE = 10;

const EMPTY_PAGE: EventsPage = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: EVENTS_PAGE_SIZE,
  last: true,
  first: true,
};

export async function getEventsPaginated(params: {
  /** ISO local date-time string, e.g. "2024-01-15T00:00:00" */
  startDate?: string;
  /** ISO local date-time string, e.g. "2024-01-20T23:59:59" */
  endDate?: string;
  page: number;
}): Promise<EventsPage> {
  const result = await fetchJson<EventsPage>('/events/paginated', {
    ...(params.startDate ? { startDate: params.startDate } : {}),
    ...(params.endDate ? { endDate: params.endDate } : {}),
    page: params.page,
    size: EVENTS_PAGE_SIZE,
  });

  return result ?? EMPTY_PAGE;
}

function buildEventsPath(type: EventDateFilter, placeId?: string) {
  const base =
    type === 'Active' ? '/events/active' : type === 'Upcoming' ? '/events/upcoming' : '/events/past';
  return placeId ? `${base}/${encodePathSegment(placeId)}` : base;
}

export async function fetchEventDtos(type: EventDateFilter, placeId?: string) {
  // The backend currently exposes /events/past only as a per-place endpoint. We still issue the
  // global request optimistically (suppressing errors) so the moment the backend ships the
  // collection-level variant the UI picks it up without another change here.
  const remotePath = buildEventsPath(type, placeId);
  const suppressErrors = type === 'Past' && !placeId;

  return (await fetchJson<EventResponseDto[]>(remotePath, undefined, { suppressErrors })) ?? [];
}

export async function getEvents(
  query = '',
  dateFilter: EventDateFilter = 'Active',
  placeFilter = 'All',
): Promise<Event[]> {
  const events = (await fetchEventDtos(dateFilter)).map((event) => buildEvent(event, dateFilter));

  return events.filter((event) => {
    const matchesQuery =
      !query ||
      matchesSearch(event.title, query) ||
      matchesSearch(event.placeName, query) ||
      matchesSearch(event.description, query);

    const matchesPlace = placeFilter === 'All' ? true : event.placeName === placeFilter;

    return matchesQuery && matchesPlace;
  });
}

export async function getEventPlaceNames() {
  const events = await Promise.all([
    fetchEventDtos('Active'),
    fetchEventDtos('Upcoming'),
    fetchEventDtos('Past'),
  ]);

  return [
    'All',
    ...Array.from(new Set(events.flat().map((event) => event.placeName).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b),
    ),
  ];
}

export async function getEventDateFilters(): Promise<EventDateFilter[]> {
  return ['Active', 'Upcoming', 'Past'];
}
