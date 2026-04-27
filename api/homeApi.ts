import { buildPlaceBase } from './apiUtils';
import { getEvents } from './eventApi';
import { getOffers } from './offerApi';
import { fetchPlacePreviewDtos } from './placeApi';
import { getQuickFilterNames } from './traitApi';
import type { HomeFeed, Place, PlacePreviewResponseDto } from './types';

// Lightweight Place suitable for home-screen carousels: built from preview data only,
// without firing six per-place detail/event/offer requests.
function buildSummaryPlace(preview: PlacePreviewResponseDto): Place {
  const base = buildPlaceBase(preview);

  return {
    ...base,
    activeEvents: [],
    dailyOffers: [],
    upcomingEvents: [],
    upcomingOffers: [],
  };
}

export async function getHomeFeed(): Promise<HomeFeed> {
  const [previews, activeOffers, activeEvents, quickFilters] = await Promise.all([
    fetchPlacePreviewDtos(),
    getOffers('active'),
    getEvents('', 'Active', 'All'),
    getQuickFilterNames(),
  ]);

  const summaries = previews.map(buildSummaryPlace);
  const trending = [...summaries].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  const locationLabel = summaries.find((place) => place.location)?.location ?? '';

  return {
    locationLabel,
    quickFilters,
    featuredPlaces: summaries.slice(0, 4),
    dailyOffers: activeOffers,
    todayEvents: activeEvents,
    trendingPlaces: trending.slice(0, 4),
    nearbyPlaces: summaries.slice(0, 4),
  };
}
