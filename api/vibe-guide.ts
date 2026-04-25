import { vibeGuideData } from './vibe-guide.data';

export type EventDateFilter = 'Today' | 'Tomorrow' | 'This Weekend' | 'Next Week';
export type SavedCollectionType = 'favorites' | 'wishlist' | 'visited';

export interface VibeEvent {
  id: string;
  title: string;
  image: string;
  placeName: string;
  date: string;
  time: string;
  type: string;
  timeframe: EventDateFilter;
}

export interface VibeOffer {
  id: string;
  title: string;
  placeName: string;
  image: string;
  discount: string;
  validUntil: string;
}

export interface VibePlace {
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
  activeEvents: VibeEvent[];
  dailyOffers: VibeOffer[];
  upcomingEvents: VibeEvent[];
  upcomingOffers: VibeOffer[];
  userRating?: number;
  userNote?: string;
  dateVisited?: string;
  mapPosition: {
    top: number;
    left: number;
  };
}

export interface HomeFeed {
  locationLabel: string;
  quickFilters: string[];
  featuredPlaces: VibePlace[];
  dailyOffers: VibeOffer[];
  todayEvents: VibeEvent[];
  trendingPlaces: VibePlace[];
  nearbyPlaces: VibePlace[];
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

export interface ProfileData {
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

function wait(ms = 120) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function matchesSearch(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export async function getHomeFeed(): Promise<HomeFeed> {
  await wait();

  return {
    locationLabel: vibeGuideData.home.locationLabel,
    quickFilters: vibeGuideData.filters.quickFilters,
    featuredPlaces: vibeGuideData.places.places.slice(0, 4),
    dailyOffers: vibeGuideData.offers.offers,
    todayEvents: vibeGuideData.events.todayEvents.slice(0, 2),
    trendingPlaces: [...vibeGuideData.places.places].reverse().slice(0, 4),
    nearbyPlaces: vibeGuideData.places.places.slice(1, 5),
  };
}

export async function getExploreFilters() {
  await wait();
  return vibeGuideData.filters.filterCategories;
}

export async function getTraitCategories() {
  await wait();
  return vibeGuideData.filters.traitCategories;
}

export async function searchPlaces(query = '', selectedFilters: string[] = []) {
  await wait();

  return vibeGuideData.places.places.filter((place) => {
    const matchesQuery =
      !query ||
      matchesSearch(place.name, query) ||
      matchesSearch(place.location, query) ||
      matchesSearch(place.type, query) ||
      place.traits.some((trait) => matchesSearch(trait, query));

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) =>
        place.traits.some((trait) => trait.toLowerCase() === filter.toLowerCase())
      );

    return matchesQuery && matchesFilters;
  });
}

export async function getEvents(query = '', dateFilter: EventDateFilter = 'Today', typeFilter = 'All') {
  await wait();

  return vibeGuideData.events.todayEvents.filter((event) => {
    const matchesQuery =
      !query ||
      matchesSearch(event.title, query) ||
      matchesSearch(event.placeName, query) ||
      matchesSearch(event.type, query);

    const matchesDate = dateFilter === 'Today' ? true : event.timeframe === dateFilter;
    const matchesType = typeFilter === 'All' ? true : event.type === typeFilter;

    return matchesQuery && matchesDate && matchesType;
  });
}

export async function getEventTypes() {
  await wait();
  return vibeGuideData.events.eventTypes;
}

export async function getEventDateFilters(): Promise<EventDateFilter[]> {
  await wait();
  return vibeGuideData.events.eventDateFilters;
}

export async function getSavedCollections(): Promise<Record<SavedCollectionType, VibePlace[]>> {
  await wait();

  return vibeGuideData.places.savedCollections;
}

export async function getPlaceById(placeId: string) {
  await wait();
  return vibeGuideData.places.places.find((place) => place.id === placeId) ?? null;
}

export async function getAllPlaces() {
  await wait();
  return vibeGuideData.places.places;
}

export async function getProfileData() {
  await wait();
  return vibeGuideData.profile.profile;
}

export async function getHelpSupportContent() {
  await wait();

  return {
    contactOptions: vibeGuideData.support.contactOptions,
    faqItems: vibeGuideData.support.faqItems,
    quickLinks: vibeGuideData.support.quickLinks,
  };
}
