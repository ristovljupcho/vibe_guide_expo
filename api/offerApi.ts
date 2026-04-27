import { encodePathSegment, fetchJson } from './apiClient';
import { buildOffer } from './apiUtils';
import type { Offer, OfferResponseDto } from './types';

function buildOffersPath(type: 'active' | 'upcoming', placeId?: string) {
  const base = type === 'active' ? '/offers/active' : '/offers/upcoming';
  return placeId ? `${base}/${encodePathSegment(placeId)}` : base;
}

export async function fetchOfferDtos(type: 'active' | 'upcoming', placeId?: string) {
  return (await fetchJson<OfferResponseDto[]>(buildOffersPath(type, placeId))) ?? [];
}

export async function getOffers(type: 'active' | 'upcoming', placeId?: string): Promise<Offer[]> {
  const badge = type === 'active' ? 'Active' : 'Upcoming';
  const offers = await fetchOfferDtos(type, placeId);
  return offers.map((offer) => buildOffer(offer, badge));
}
