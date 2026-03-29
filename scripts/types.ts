import { ImageSourcePropType } from "react-native";

export type PlaceProps = {
  name: string;
  description: string;
  mapsUri: string;
  phoneNumber: string;
  address: string;
  rating: number;
  menuLink: string;
  primaryType: string;
  priceLevel: string;
};

export type PlaceCardProps = {
  id: string;
  name: string;
  description: string;
  rating: number;
  primaryType: string;
  priceLevel: string;
  topTraits: string[];
};

export type PlaceInformationProps = {
  rating: number;
  type: string;
  priceLevel: string;
  address: string;
  workingHours: { days: string; hours: string }[];
  description: string;
};

export type PlaceImagesProps = {};

export type TraitCarouselProps = {
  name: string;
};

export type CardProps = {
  name: string;
  description: string;
  placeName: string;
  startDate: string;
  endDate: string;
  image: ImageSourcePropType | null;
};
