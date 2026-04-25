import type {
  ContactOption,
  EventDateFilter,
  FaqItem,
  FilterCategory,
  ProfileData,
  SavedCollectionType,
  VibeEvent,
  VibeOffer,
  VibePlace,
} from './vibe-guide';

const todayEvents: VibeEvent[] = [
  {
    id: 'event-1',
    title: 'Live Jazz Night',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop',
    placeName: 'The Jazz Corner',
    date: 'April 5, 2026',
    time: '8:00 PM',
    type: 'Live Music',
    timeframe: 'Today',
  },
  {
    id: 'event-2',
    title: 'Rooftop Party',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    placeName: 'Skybar 360',
    date: 'April 6, 2026',
    time: '9:00 PM',
    type: 'Party',
    timeframe: 'Tomorrow',
  },
  {
    id: 'event-3',
    title: 'Wine Tasting Evening',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
    placeName: 'The Velvet Lounge',
    date: 'April 8, 2026',
    time: '7:00 PM',
    type: 'Special Event',
    timeframe: 'Next Week',
  },
  {
    id: 'event-4',
    title: 'DJ Night - House Music',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c2f7cdbc?w=800&h=600&fit=crop',
    placeName: 'Luna Rooftop',
    date: 'April 10, 2026',
    time: '10:00 PM',
    type: 'DJ',
    timeframe: 'This Weekend',
  },
];

const offers: VibeOffer[] = [
  {
    id: 'offer-1',
    title: 'Happy Hour Special',
    placeName: 'The Velvet Lounge',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop',
    discount: '2-for-1',
    validUntil: 'April 10, 2026',
  },
  {
    id: 'offer-2',
    title: 'Weekend Brunch Deal',
    placeName: 'Ocean View Bistro',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    discount: '-20%',
    validUntil: 'April 15, 2026',
  },
  {
    id: 'offer-3',
    title: 'Chef Table Preview',
    placeName: 'Luna Rooftop',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    discount: '-30%',
    validUntil: 'April 12, 2026',
  },
];

const places: VibePlace[] = [
  {
    id: '1',
    name: 'The Velvet Lounge',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop',
    traits: ['Cocktails', 'Cozy', 'Live Music', 'Romantic', 'Jazz'],
    location: 'Downtown',
    distance: '0.5 km',
    rating: 4.7,
    type: 'Cocktail Bar',
    price: '$$',
    description:
      'Experience the epitome of sophisticated nightlife at The Velvet Lounge. Plush seating, warm lighting, and a deep cocktail list make it the kind of place you stay longer than planned.',
    gallery: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=900&fit=crop',
    ],
    activeEvents: [todayEvents[0]],
    dailyOffers: [offers[0]],
    upcomingEvents: [todayEvents[2]],
    upcomingOffers: [],
    userRating: 5,
    userNote: 'Amazing cocktails and a perfect date-night atmosphere.',
    dateVisited: 'March 15, 2026',
    mapPosition: { top: 42, left: 48 },
  },
  {
    id: '2',
    name: 'Skybar 360',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
    traits: ['Rooftop', 'Premium', 'City Views', 'Champagne', 'VIP'],
    location: 'Marina District',
    distance: '1.2 km',
    rating: 4.9,
    type: 'Rooftop Bar',
    price: '$$$',
    description:
      'Panoramic skyline views, polished service, and a golden-hour crowd that turns into an after-dark scene.',
    gallery: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=900&fit=crop',
    ],
    activeEvents: [],
    dailyOffers: [],
    upcomingEvents: [todayEvents[1]],
    upcomingOffers: [],
    userRating: 4.5,
    userNote: 'Best city views. Go before sunset for the full effect.',
    dateVisited: 'March 22, 2026',
    mapPosition: { top: 35, left: 58 },
  },
  {
    id: '3',
    name: 'The Jazz Corner',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop',
    traits: ['Jazz', 'Romantic', 'Wine Bar', 'Intimate', 'Classic'],
    location: 'Old Town',
    distance: '2.1 km',
    rating: 4.6,
    type: 'Jazz Club',
    price: '$$',
    description:
      'A timeless room made for close conversations, candlelight, and long live sets with serious musicians.',
    gallery: [
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=900&fit=crop',
    ],
    activeEvents: [],
    dailyOffers: [],
    upcomingEvents: [],
    upcomingOffers: [],
    userNote: 'Want to try their late-night jazz sessions this weekend.',
    mapPosition: { top: 58, left: 42 },
  },
  {
    id: '4',
    name: 'Ocean View Bistro',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    traits: ['Seafood', 'Beach', 'Sunset', 'Fresh', 'Ocean'],
    location: 'Beachfront',
    distance: '3.5 km',
    rating: 4.8,
    type: 'Restaurant & Bar',
    price: '$$$',
    description:
      'Fresh seafood, breezy interiors, and one of the best sunset tables in town when the weather is right.',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop',
    ],
    activeEvents: [],
    dailyOffers: [offers[1]],
    upcomingEvents: [],
    upcomingOffers: [],
    userNote: 'Recommended by Sarah. Must check out the sunset view.',
    mapPosition: { top: 68, left: 55 },
  },
  {
    id: '5',
    name: 'The Rustic Pub',
    image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&h=600&fit=crop',
    traits: ['Beer', 'Sports', 'Casual', 'Craft Beer'],
    location: 'Midtown',
    distance: '1.8 km',
    rating: 4.3,
    type: 'Pub',
    price: '$$',
    description:
      'A relaxed neighborhood spot with rotating taps, game-day energy, and a crowd that keeps things easy.',
    gallery: [
      'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&h=900&fit=crop',
    ],
    activeEvents: [],
    dailyOffers: [],
    upcomingEvents: [],
    upcomingOffers: [],
    userRating: 4,
    userNote: 'Great for watching games with friends.',
    dateVisited: 'February 28, 2026',
    mapPosition: { top: 47, left: 34 },
  },
  {
    id: '6',
    name: 'Luna Rooftop',
    image: 'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=800&h=600&fit=crop',
    traits: ['Rooftop', 'Cocktails', 'Romantic', 'DJ'],
    location: 'Upper East',
    distance: '2.5 km',
    rating: 4.5,
    type: 'Sky Lounge',
    price: '$$$',
    description:
      'Soft lighting, lounge seating, and a soundtrack that starts mellow and ends with a dance floor.',
    gallery: [
      'https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=900&fit=crop',
    ],
    activeEvents: [],
    dailyOffers: [offers[2]],
    upcomingEvents: [todayEvents[3]],
    upcomingOffers: [],
    mapPosition: { top: 24, left: 44 },
  },
];

const quickFilters = [
  'Cocktails',
  'Beer',
  'Seafood',
  'Live Music',
  'Rooftop',
  'Cozy',
  'Romantic',
  'Open Now',
];

const filterCategories: FilterCategory[] = [
  {
    name: 'Vibe',
    options: ['Cozy', 'Romantic', 'Energetic', 'Chill', 'Upscale', 'Casual', 'Intimate', 'Lively'],
  },
  {
    name: 'Music',
    options: ['Live Music', 'DJ', 'Jazz', 'Acoustic', 'No Music', 'Electronic'],
  },
  {
    name: 'Food & Drink',
    options: ['Cocktails', 'Beer', 'Wine', 'Seafood', 'Tapas', 'Craft Beer'],
  },
  {
    name: 'Setting',
    options: ['Rooftop', 'Beach', 'Indoor', 'Outdoor', 'Garden', 'Waterfront'],
  },
];

const profile: ProfileData = {
  initials: 'JD',
  fullName: 'John Doe',
  username: '@johndoe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  bio: 'Love exploring new places and discovering hidden gems in the city.',
  stats: [
    { label: 'Saved', value: '24', icon: 'heart' },
    { label: 'Visited', value: '15', icon: 'location' },
    { label: 'Events', value: '8', icon: 'calendar' },
    { label: 'Reviews', value: '12', icon: 'ribbon' },
  ],
};

const traitCategories: FilterCategory[] = [
  ...filterCategories,
  {
    name: 'Crowd',
    options: ['Young', 'Mature', 'Mixed', 'Trendy', 'Local', 'Tourist', 'Professional', 'Artistic'],
  },
];

const contactOptions: ContactOption[] = [
  {
    icon: 'chatbubbles',
    label: 'Live Chat',
    description: 'Chat with our support team',
    available: true,
  },
  {
    icon: 'mail',
    label: 'Email Support',
    description: 'support@vibeguide.com',
    available: true,
  },
  {
    icon: 'call',
    label: 'Phone Support',
    description: '+1 (555) 123-4567',
    available: false,
  },
];

const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I save a place to my favorites?',
    answer:
      'Tap the heart icon on any place card or in the place profile to add it to favorites. You can review everything in the Saved tab.',
  },
  {
    id: 'faq-2',
    question: 'How do I filter places by traits?',
    answer:
      'Use the filter control on Explore to combine traits like Cozy, Rooftop, or Live Music, then apply them to narrow the list.',
  },
  {
    id: 'faq-3',
    question: 'Can I share places with friends?',
    answer:
      'Yes. Open any place detail and use the share action from the device sheet or copy the link for later.',
  },
  {
    id: 'faq-4',
    question: 'How do daily offers work?',
    answer:
      'Daily offers are venue promotions. Save the one you want and show it at the venue when you arrive.',
  },
  {
    id: 'faq-5',
    question: 'How accurate is the distance shown?',
    answer:
      'Distance is estimated from your current location. Keep location services enabled for the best accuracy.',
  },
];

const quickLinks = [
  'Getting Started Guide',
  'Account Management',
  'Troubleshooting',
  'Feature Requests',
  'Report a Bug',
  'Community Guidelines',
];

const eventTypes = ['All', 'Live Music', 'DJ', 'Party', 'Special Event', 'Food Event'];
const eventDateFilters: EventDateFilter[] = ['Today', 'Tomorrow', 'This Weekend', 'Next Week'];
const savedCollections: Record<SavedCollectionType, VibePlace[]> = {
  favorites: [places[0], places[1]],
  wishlist: [places[2], places[3]],
  visited: [places[4]],
};

export const vibeGuideData = {
  events: {
    todayEvents,
    eventTypes,
    eventDateFilters,
  },
  offers: {
    offers,
  },
  places: {
    places,
    savedCollections,
  },
  filters: {
    quickFilters,
    filterCategories,
    traitCategories,
  },
  profile: {
    profile,
  },
  support: {
    contactOptions,
    faqItems,
    quickLinks,
  },
  home: {
    locationLabel: 'New York, NY',
  },
} as const;
