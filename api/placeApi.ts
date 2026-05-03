import { encodePathSegment, fetchJson } from './apiClient';
import { buildEvent, buildOffer, buildPlaceBase, matchesSearch } from './apiUtils';
import { fetchEventDtos } from './eventApi';
import { fetchOfferDtos } from './offerApi';
import { getTopTraits } from './traitApi';
import type { Place, PlaceCardResponseDto, PlacePreviewResponseDto, PlaceResponseDto } from './types';

export async function fetchPlacePreviewDtos(traits?: string[]) {
  return (
    (await fetchJson<PlacePreviewResponseDto[]>('/places', {
      traits: traits && traits.length > 0 ? traits : undefined,
    })) ?? []
  );
}

// Lightweight fetch for the Explore list — uses the preview payload directly,
// no per-place detail/event/offer calls. Text search is done client-side by the caller.
export async function getExplorePlaces(traits?: string[]): Promise<PlaceCardResponseDto[]> {
  return (
    (await fetchJson<PlaceCardResponseDto[]>('/places', {
      traits: traits && traits.length > 0 ? traits : undefined,
    })) ?? []
  );
}

export async function fetchPlaceDetailDto(placeId: string) {
  return await fetchJson<PlaceResponseDto>(`/places/${encodePathSegment(placeId)}`, undefined, {
    suppressErrors: true,
  });
}

export async function buildPlace(placePreview: PlacePreviewResponseDto): Promise<Place> {
  const [detail, topTraits, activeEvents, activeOffers, upcomingEvents, upcomingOffers] =
    await Promise.all([
      fetchPlaceDetailDto(placePreview.id),
      getTopTraits(placePreview.id),
      fetchEventDtos('Active', placePreview.id),
      fetchOfferDtos('active', placePreview.id),
      fetchEventDtos('Upcoming', placePreview.id),
      fetchOfferDtos('upcoming', placePreview.id),
    ]);

  const mapped = buildPlaceBase(placePreview, detail);

  return {
    ...mapped,
    traits: topTraits.length > 0 ? topTraits.map((trait) => trait.name) : mapped.traits,
    activeEvents: activeEvents.map((event) => buildEvent(event, 'Active')),
    dailyOffers: activeOffers.map((offer) => buildOffer(offer, 'Active')),
    upcomingEvents: upcomingEvents.map((event) => buildEvent(event, 'Upcoming')),
    upcomingOffers: upcomingOffers.map((offer) => buildOffer(offer, 'Upcoming')),
  };
}

export async function searchPlaces(query = '', selectedFilters: string[] = []) {
  const previews = await fetchPlacePreviewDtos(selectedFilters);
  const places = await Promise.all(previews.map((preview) => buildPlace(preview)));

  return places.filter((place) => {
    const matchesQuery =
      !query ||
      matchesSearch(place.name, query) ||
      matchesSearch(place.location, query) ||
      matchesSearch(place.type, query) ||
      matchesSearch(place.description, query) ||
      place.traits.some((trait) => matchesSearch(trait, query));

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) =>
        place.traits.some((trait) => trait.toLowerCase() === filter.toLowerCase()),
      );

    return matchesQuery && matchesFilters;
  });
}

export async function getPlaceById(placeId: string): Promise<Place | null> {
  const detail = await fetchPlaceDetailDto(placeId);

  if (!detail) {
    return null;
  }

  const preview: PlacePreviewResponseDto = {
    id: placeId,
    name: detail.name,
    description: detail.description,
    address: detail.address,
    rating: detail.rating,
    primaryType: detail.primaryType,
    priceLevel: detail.priceLevel,
    imageUrls: detail.imageUrls,
    topTraits: [],
  };

  return buildPlace(preview);
}

export async function getAllPlaces() {
  const previews = await fetchPlacePreviewDtos();
  return Promise.all(previews.map((preview) => buildPlace(preview)));
}
