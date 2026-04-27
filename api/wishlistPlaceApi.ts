import { encodePathSegment, fetchJson, getDefaultUserId } from './apiClient';
import { buildWishlistPlace } from './savedPlaceShared';
import type { Place, WishlistPlaceResponseDto } from './types';

export async function getWishlistPlaces(): Promise<Place[]> {
  const remote =
    (await fetchJson<WishlistPlaceResponseDto[]>(
      `/wishlist-places/${encodePathSegment(getDefaultUserId())}`,
      undefined,
      { suppressErrors: true },
    )) ?? [];

  return Promise.all(remote.map((item) => buildWishlistPlace(item)));
}
