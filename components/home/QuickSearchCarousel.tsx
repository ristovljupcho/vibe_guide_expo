import { CARD } from "@/assets/styles/shared/tokens";
import { textStyles } from "@/assets/styles/shared/text.styles";
import { quickSearchStyles } from "@/assets/styles/views/quick-search.styles";
import React, { memo } from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";

const SQUARES = [
  {
    id: "1",
    label: "Cocktail",
    color: "rgba(255,100,90,0.4)",
    image: require("@/assets/images/aperol.png"),
  },
  {
    id: "2",
    label: "Beer",
    color: "rgba(249,219,111,0.4)",
    image: require("@/assets/images/beer.png"),
  },
  {
    id: "3",
    label: "Coffee",
    color: "rgba(250, 249, 246,0.4)",
    image: require("@/assets/images/coffee.png"),
  },
  {
    id: "4",
    label: "Hamburger",
    color: "rgba(110,192,7,0.4)",
    image: require("@/assets/images/hamburger.png"),
  },
  {
    id: "5",
    label: "Pizza",
    color: "rgba(246,161,146,0.4)",
    image: require("@/assets/images/pizza.png"),
  },
  {
    id: "6",
    label: "Sushi",
    color: "rgba(250, 249, 246,0.4)",
    image: require("@/assets/images/sushi.png"),
  },
];

function QuickSearchCarousel() {
  const renderItem = ({ item }: ListRenderItemInfo<(typeof SQUARES)[0]>) => (
    <View style={quickSearchStyles.itemContainer}>
      <View style={quickSearchStyles.square}>
        <View
          style={[quickSearchStyles.overlay, { backgroundColor: item.color }]}
        />
        <View style={quickSearchStyles.imageWrapper}>
          <ImageBackground
            source={item.image}
            style={quickSearchStyles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <Text style={[textStyles.informationsText, quickSearchStyles.label]}>
        {item.label}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={SQUARES}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD.snapInterval / 3.65}
      decelerationRate="fast"
      contentContainerStyle={quickSearchStyles.listContainer}
    />
  );
}

export default memo(QuickSearchCarousel);
