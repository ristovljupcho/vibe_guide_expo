import { buildPlaceBase } from './apiUtils';
import { fetchPlaceDetailDto } from './placeApi';
import type {
  FavouritePlaceResponseDto,
  Place,
  PlacePreviewResponseDto,
  VisitedPlaceResponseDto,
  WishlistPlaceResponseDto,
} from './types';

function buildSavedPreview(
  collectionItem: FavouritePlaceResponseDto | WishlistPlaceResponseDto | VisitedPlaceResponseDto,
): PlacePreviewResponseDto {
  const name = 'placeName' in collectionItem ? collectionItem.placeName : collectionItem.name;

  return {
    id: collectionItem.placeId,
    name,
    description: collectionItem.description,
    rating: collectionItem.rating,
    primaryType: '',
    priceLevel: '',
    topTraits: [],
  };
}

async function buildSavedPlaceBase(
  collectionItem: FavouritePlaceResponseDto | WishlistPlaceResponseDto | VisitedPlaceResponseDto,
) {
  const preview = buildSavedPreview(collectionItem);
  const detail = await fetchPlaceDetailDto(collectionItem.placeId);
  const mapped = buildPlaceBase(preview, detail);

  return {
    ...mapped,
    activeEvents: [],
    dailyOffers: [],
    upcomingEvents: [],
    upcomingOffers: [],
    userNote: collectionItem.note || undefined,
  } satisfies Place;
}

export async function buildFavouritePlace(item: FavouritePlaceResponseDto): Promise<Place> {
  return buildSavedPlaceBase(item);
}

export async function buildWishlistPlace(item: WishlistPlaceResponseDto): Promise<Place> {
  return buildSavedPlaceBase(item);
}

export async function buildVisitedPlace(item: VisitedPlaceResponseDto): Promise<Place> {
  return {
    ...(await buildSavedPlaceBase(item)),
    dateVisited: new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}
