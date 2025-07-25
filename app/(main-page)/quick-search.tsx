import { ScrollView, StyleSheet, View } from "react-native";

import beer_image from "../../assets/icons/beer.png";
import cocktail_image from "../../assets/icons/cocktail.png";
import esspresso_image from "../../assets/icons/esspresso.png";
import pizza_image from "../../assets/icons/pizza.png";
import burger_image from "../../assets/icons/burger.png";
import sushi_image from "../../assets/icons/sushi.png";
import salad_image from "../../assets/icons/salad.png";
import Icon from "./icon";

export default function QuickSearch() {
  const icons = [
    {
      imageSrc: beer_image,
      caption: "Beers",
      backgroundColor: "rgba(245, 124, 0, 0.2)",
    },
    {
      imageSrc: cocktail_image,
      caption: "Cocktails",
      backgroundColor: "rgba(66, 165, 245, 0.2)",
    },
    {
      imageSrc: esspresso_image,
      caption: "Specialty Coffee",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    {
      imageSrc: pizza_image,
      caption: "Pizza",
      backgroundColor: "rgba(255, 235, 59, 0.2)",
    },
    {
      imageSrc: burger_image,
      caption: "Hamburger",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
    {
      imageSrc: sushi_image,
      caption: "Sushi",
      backgroundColor: "rgba(224, 224, 224, 0.2)",
    },
    {
      imageSrc: salad_image,
      caption: "Vegan Food",
      backgroundColor: "rgba(212, 225, 87, 0.2)",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.iconHorizontalCarousel}
      >
        {icons.map((icon, index) => (
          <Icon
            key={index}
            imageSrc={icon.imageSrc}
            caption={icon.caption}
            backgroundColor={icon.backgroundColor}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconHorizontalCarousel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
