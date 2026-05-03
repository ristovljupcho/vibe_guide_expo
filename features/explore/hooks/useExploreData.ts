import { useQuery } from '@tanstack/react-query';

import { getExplorePlaces } from '@/api/placeApi';
import { getExploreFilters } from '@/api/traitApi';

export function useExploreFilters() {
  return useQuery({
    queryKey: ['explore-filters'],
    queryFn: getExploreFilters,
    staleTime: 10 * 60 * 1000,
  });
}

export function useExplorePlaces(appliedFilters: string[]) {
  return useQuery({
    queryKey: ['explore-places', appliedFilters],
    queryFn: () => getExplorePlaces(appliedFilters),
    staleTime: 5 * 60 * 1000,
  });
}
