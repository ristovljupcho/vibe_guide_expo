import { PlaceCardProps } from "@/scripts/types";

export const places: PlaceCardProps[] = [
  {
    id: "casa-bar",
    name: "Casa Bar",
    rating: 4.7,
    description: "Cozy bar with live music and amazing cocktails.",
    primaryType: "Cocktail Bar",
    priceLevel: "MODERATE",
    topTraits: ["Cozy", "Live Music", "Cocktails"],
  },
  {
    id: "ocean-view-lounge",
    name: "Ocean View Lounge",
    rating: 4.5,
    description: "Relax with a seaside vibe and specialty drinks.",
    primaryType: "Lounge",
    priceLevel: "EXPENSIVE",
    topTraits: ["Seaside", "Chill", "Specialty Drinks"],
  },
];
