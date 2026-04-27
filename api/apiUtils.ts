import type {
  Event,
  EventResponseDto,
  FilterCategory,
  Offer,
  OfferResponseDto,
  PlacePreviewResponseDto,
  PlaceResponseDto,
  TraitResponseDto,
} from './types';

export function matchesSearch(value: string | undefined, query: string) {
  if (!value) {
    return false;
  }

  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export function formatEnumLabel(value: string | undefined) {
  if (!value) {
    return '';
  }

  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function mapPriceLevel(priceLevel: string | undefined) {
  switch (priceLevel) {
    case 'CHEAP':
      return '$';
    case 'MODERATE':
      return '$$';
    case 'EXPENSIVE':
      return '$$$';
    case 'VERY_EXPENSIVE':
      return '$$$$';
    default:
      return undefined;
  }
}

export function toDateParts(startDate: string, endDate?: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : undefined;

  return {
    date: start.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    time: end
      ? `${start.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        })} - ${end.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        })}`
      : start.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
  };
}

export function buildEvent(event: EventResponseDto, type: Event['type']): Event {
  const { date, time } = toDateParts(event.startDate, event.endDate);

  return {
    id: event.id,
    title: event.name,
    image: event.imageUrl,
    placeName: event.placeName,
    date,
    time,
    type,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
  };
}

export function buildOffer(offer: OfferResponseDto, badge: string): Offer {
  return {
    id: offer.id,
    title: offer.name,
    placeName: offer.placeName,
    image: offer.imageUrl,
    badge,
    validUntil: new Date(offer.endDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    description: offer.description,
    startDate: offer.startDate,
    endDate: offer.endDate,
  };
}

export function buildPlaceBase(placePreview: PlacePreviewResponseDto, placeDetail?: PlaceResponseDto | null) {
  const imageUrls = placeDetail?.imageUrls ?? [];

  return {
    id: placePreview.id,
    name: placeDetail?.name ?? placePreview.name,
    image: imageUrls[0] ?? '',
    traits: placePreview.topTraits ?? [],
    location: placeDetail?.address ?? '',
    rating: placeDetail?.rating ?? placePreview.rating,
    type: formatEnumLabel(placeDetail?.primaryType ?? placePreview.primaryType),
    price: mapPriceLevel(placeDetail?.priceLevel ?? placePreview.priceLevel),
    description: placeDetail?.description ?? placePreview.description,
    gallery: imageUrls,
    mapsUri: placeDetail?.mapsUri,
    phoneNumber: placeDetail?.phoneNumber,
    menuLink: placeDetail?.menuLink,
  };
}

export function sortFilterCategories(categories: Record<string, string[]>): FilterCategory[] {
  return Object.entries(categories).map(([name, options]) => ({ name, options }));
}

export function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function buildTraitFilters(traits: TraitResponseDto[]): FilterCategory[] {
  const grouped = traits.reduce<Record<string, string[]>>((accumulator, trait) => {
    const key = formatEnumLabel(trait.traitType) || 'General';
    const current = accumulator[key] ?? [];

    if (!current.includes(trait.name)) {
      current.push(trait.name);
    }

    accumulator[key] = current.sort((a, b) => a.localeCompare(b));
    return accumulator;
  }, {});

  return sortFilterCategories(grouped);
}
