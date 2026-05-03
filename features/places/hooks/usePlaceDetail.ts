import { useQuery } from '@tanstack/react-query';

import { encodePathSegment, fetchJson } from '@/api/apiClient';
import type { EventResponseDto, OfferResponseDto, PlaceResponseDto, TraitCarouselResponseDto } from '@/api/types';

interface PlaceDetailData {
  place: PlaceResponseDto;
  traits: TraitCarouselResponseDto[];
  activeEvents: EventResponseDto[];
  upcomingEvents: EventResponseDto[];
  activeOffers: OfferResponseDto[];
  upcomingOffers: OfferResponseDto[];
}

async function fetchPlaceDetail(placeId: string): Promise<PlaceDetailData | null> {
  const id = encodePathSegment(placeId);

  const [place, traits, activeEvents, upcomingEvents, activeOffers, upcomingOffers] =
    await Promise.all([
      fetchJson<PlaceResponseDto>(`/places/${id}`),
      fetchJson<TraitCarouselResponseDto[]>(`/places/${id}/traits/carousel`, undefined, {
        suppressErrors: true,
      }),
      fetchJson<EventResponseDto[]>(`/events/active/${id}`, undefined, { suppressErrors: true }),
      fetchJson<EventResponseDto[]>(`/events/upcoming/${id}`, undefined, { suppressErrors: true }),
      fetchJson<OfferResponseDto[]>(`/offers/active/${id}`, undefined, { suppressErrors: true }),
      fetchJson<OfferResponseDto[]>(`/offers/upcoming/${id}`, undefined, { suppressErrors: true }),
    ]);

  if (!place) {
    return null;
  }

  return {
    place,
    traits: traits ?? [],
    activeEvents: activeEvents ?? [],
    upcomingEvents: upcomingEvents ?? [],
    activeOffers: activeOffers ?? [],
    upcomingOffers: upcomingOffers ?? [],
  };
}

export function usePlaceDetail(placeId: string | undefined) {
  return useQuery({
    queryKey: ['place', placeId],
    queryFn: () => fetchPlaceDetail(placeId!),
    enabled: !!placeId,
    staleTime: 10 * 60 * 1000,
  });
}
