import { encodePathSegment, fetchJson, getDefaultUserId } from './apiClient';
import { buildVisitedPlace } from './savedPlaceShared';
import type { Place, VisitedPlaceResponseDto } from './types';

export async function getVisitedPlaces(): Promise<Place[]> {
  const remote =
    (await fetchJson<VisitedPlaceResponseDto[]>(
      `/visited-places/${encodePathSegment(getDefaultUserId())}`,
      undefined,
      { suppressErrors: true },
    )) ?? [];

  return Promise.all(remote.map((item) => buildVisitedPlace(item)));
}
