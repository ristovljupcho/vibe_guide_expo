import { ImageSourcePropType } from "react-native";

export type PlaceProps = {
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
  images: string[];
  workingHours?: {
    friSat: string;
    sunThu: string;
  };
};

export type CarouselTraitProps = {
  traits: string[];
};

export type EventAndOfferCardProps = {
  eventName?: string;
  placeName: string;
  startDate: string;
  endDate: string;
  description: string;
  image: ImageSourcePropType;
};
