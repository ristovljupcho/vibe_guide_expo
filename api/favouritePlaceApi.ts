import { encodePathSegment, fetchJson, getDefaultUserId } from './apiClient';
import { buildFavouritePlace } from './savedPlaceShared';
import type { FavouritePlaceResponseDto, Place } from './types';

export async function getFavouritePlaces(): Promise<Place[]> {
  const remote =
    (await fetchJson<FavouritePlaceResponseDto[]>(
      `/favourite-places/${encodePathSegment(getDefaultUserId())}`,
      undefined,
      { suppressErrors: true },
    )) ?? [];

  return Promise.all(remote.map((item) => buildFavouritePlace(item)));
}
