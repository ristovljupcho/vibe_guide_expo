import { Link } from "expo-router";
import { Pressable, View, Text, SafeAreaView } from "react-native";
import { CardProps } from "./card";
import { sharedStyles } from "@/styles/sharedStyles";
import { textStyles } from "@/styles/textStyles";
import Carousel from "./carousel";

type CarouselSectionProps = {
  title: string;
  buttonLink: string;
  cards: CardProps[];
};

export default function CarouselSection({
  title,
  buttonLink,
  cards,
}: CarouselSectionProps) {
  return (
    <SafeAreaView style={textStyles.groupContainer}>
      <View style={[sharedStyles.informationRow]}>
        <Text style={[textStyles.text, textStyles.headingText]}>{title}</Text>
        <Link href={"/(main-page)/daily-offer-card"} asChild>
          <Pressable style={sharedStyles.button}>
            <Text
              style={[
                textStyles.text,
                textStyles.captionsText,
                textStyles.buttonText,
              ]}
            >
              See all
            </Text>
          </Pressable>
        </Link>
      </View>
      <Carousel cards={cards} />
    </SafeAreaView>
  );
}
