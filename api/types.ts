export type EventDateFilter = 'Active' | 'Upcoming' | 'Past';
export type SavedCollectionType = 'favorites' | 'wishlist' | 'visited';

export interface Event {
  id: string;
  title: string;
  image: string;
  placeName: string;
  date: string;
  time: string;
  type: EventDateFilter;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Offer {
  id: string;
  title: string;
  placeName: string;
  image: string;
  badge: string;
  validUntil: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Place {
  id: string;
  name: string;
  image: string;
  traits: string[];
  location: string;
  distance?: string;
  rating?: number;
  type: string;
  price?: string;
  description: string;
  gallery: string[];
  activeEvents: Event[];
  dailyOffers: Offer[];
  upcomingEvents: Event[];
  upcomingOffers: Offer[];
  userRating?: number;
  userNote?: string;
  dateVisited?: string;
  mapPosition?: {
    top: number;
    left: number;
  };
  mapsUri?: string;
  phoneNumber?: string;
  menuLink?: string;
}

export interface HomeFeed {
  locationLabel: string;
  quickFilters: string[];
  featuredPlaces: Place[];
  dailyOffers: Offer[];
  todayEvents: Event[];
  trendingPlaces: Place[];
  nearbyPlaces: Place[];
}

export interface FilterCategory {
  name: string;
  options: string[];
}

export interface ProfileStat {
  label: string;
  value: string;
  icon: 'heart' | 'location' | 'calendar' | 'ribbon';
}

export interface Profile {
  initials: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  stats: ProfileStat[];
}

export interface ContactOption {
  icon: 'chatbubbles' | 'mail' | 'call';
  label: string;
  description: string;
  available: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HelpSupportContent {
  contactOptions: ContactOption[];
  faqItems: FaqItem[];
  quickLinks: string[];
}

export interface PlacePreviewResponseDto {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  primaryType: string;
  priceLevel: string;
  imageUrls: string[];
  topTraits: string[];
}

export interface PlaceResponseDto {
  name: string;
  description: string;
  mapsUri: string;
  phoneNumber: string;
  address: string;
  rating: number;
  menuLink: string;
  primaryType: string;
  priceLevel: string;
  imageUrls: string[];
}

export interface PlaceCardResponseDto {
  id: string;
  name: string;
  description: string;
  address?: string;
  rating: number;
  primaryType: string;
  priceLevel: string;
  imageUrls: string[];
  topTraits?: string[];
}

export interface EventResponseDto {
  id: string;
  name: string;
  placeName: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export interface OfferResponseDto {
  id: string;
  name: string;
  placeName: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export interface FavouritePlaceResponseDto {
  placeId: string;
  name: string;
  rating: number;
  description: string;
  createdAt: string;
  note: string;
}

export interface WishlistPlaceResponseDto {
  placeId: string;
  name: string;
  rating: number;
  description: string;
  createdAt: string;
  note: string;
}

export interface VisitedPlaceResponseDto {
  placeId: string;
  placeName: string;
  rating: number;
  description: string;
  createdAt: string;
  note: string;
}

export interface TraitResponseDto {
  traitId: string;
  traitType: string;
  name: string;
}

export interface TraitCarouselResponseDto {
  name: string;
}

export interface UserTableDto {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface EventsPage {
  content: EventResponseDto[];
  totalElements: number;
  totalPages: number;
  /** 0-indexed current page number */
  number: number;
  size: number;
  last: boolean;
  first: boolean;
}
