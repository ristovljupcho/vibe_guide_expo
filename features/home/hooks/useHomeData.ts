import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '@/api/apiClient';
import type { EventResponseDto, OfferResponseDto, PlaceCardResponseDto } from '@/api/types';

interface HomeData {
  topPlaces: PlaceCardResponseDto[];
  upcomingEvents: EventResponseDto[];
  activeOffers: OfferResponseDto[];
  upcomingOffers: OfferResponseDto[];
}

async function fetchHomeData(): Promise<HomeData> {
  const [topPlaces, upcomingEvents, activeOffers, upcomingOffers] = await Promise.all([
    fetchJson<PlaceCardResponseDto[]>('/places/top'),
    fetchJson<EventResponseDto[]>('/events/upcoming'),
    fetchJson<OfferResponseDto[]>('/offers/active'),
    fetchJson<OfferResponseDto[]>('/offers/upcoming'),
  ]);

  return {
    topPlaces: (topPlaces ?? []).map((place) => ({
      ...place,
      imageUrls: place.imageUrls ?? [],
      topTraits: place.topTraits ?? [],
    })),
    upcomingEvents: upcomingEvents ?? [],
    activeOffers: activeOffers ?? [],
    upcomingOffers: upcomingOffers ?? [],
  };
}

export function useHomeData() {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000,
  });
}
