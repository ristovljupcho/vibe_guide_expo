import { PlaceCardProps } from "../../components/PlaceCard";

export const places: PlaceCardProps[] = [
  {
    placeName: "Casa Bar",
    location: "Downtown, Skopje",
    rating: 4.7,
    description: "Cozy bar with live music and amazing cocktails.",
    traits: ["Cozy", "Live Music", "Cocktails"],
    image: require("@/assets/data/casa-images/cocktail1.jpg"),
  },
  {
    placeName: "Ocean View Lounge",
    location: "Beachfront, Ohrid",
    rating: 4.5,
    description: "Relax with a seaside vibe and specialty drinks.",
    traits: ["Seaside", "Chill", "Specialty Drinks"],
    image: require("@/assets/data/casa-images/cocktail2.jpg"),
  },
];
