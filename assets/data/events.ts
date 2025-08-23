import { CardProps } from "../../components/Card";

export const events: CardProps[] = [
  {
    eventName: "Sunset Cocktail Hour",
    placeName: "Casa Bar",
    description:
      "Enjoy heavenly cold pints and refreshing cocktails while watching the sunset over the city. Perfect for mingling and unwinding after a long day.",
    startDate: "2025-08-15T18:00:00",
    endDate: "2025-08-15T21:00:00",
    image: require("@/assets/data/casa-images/cocktail1.jpg"),
  },
  {
    eventName: "Tropical Tiki Night",
    placeName: "Casa Bar",
    description:
      "Step into a tropical paradise with exotic cocktails, vibrant music, and a lively crowd ready to dance the night away.",
    startDate: "2025-08-22T20:00:00",
    endDate: "2025-08-23T02:00:00",
    image: require("@/assets/data/casa-images/cocktail2.jpg"),
  },
];
