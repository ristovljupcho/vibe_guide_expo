import { ImageSourcePropType } from "react-native";

export type PlaceInfromationProps = {
  placeId: string;
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
