import { useQuery } from '@tanstack/react-query';

import { getFavouritePlaces } from '@/api/favouritePlaceApi';
import { getVisitedPlaces } from '@/api/visitedPlaceApi';
import { getWishlistPlaces } from '@/api/wishlistPlaceApi';
import type { Place, SavedCollectionType } from '@/api/types';

export type SavedCollections = Record<SavedCollectionType, Place[]>;

const emptySavedCollections: SavedCollections = {
  favorites: [],
  wishlist: [],
  visited: [],
};

async function fetchSavedCollections(): Promise<SavedCollections> {
  const [favorites, wishlist, visited] = await Promise.all([
    getFavouritePlaces(),
    getWishlistPlaces(),
    getVisitedPlaces(),
  ]);

  return { favorites, wishlist, visited };
}

export function useSavedPlaces() {
  return useQuery({
    queryKey: ['saved'],
    queryFn: fetchSavedCollections,
    staleTime: 0,
    initialData: emptySavedCollections,
  });
}
