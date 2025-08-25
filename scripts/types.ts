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

export type EventAndOfferCardProps = {
  eventName?: string;
  placeName: string;
  startDate: string;
  endDate: string;
  description: string;
  image: ImageSourcePropType;
};
