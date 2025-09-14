import { GRADIENT_COLORS } from "@/constants/gradient-colors";
import { PlaceCardProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cardStyles } from "../assets/styles/card.styles";
import { placeCardStyles } from "../assets/styles/place-card.styles";
import { textStyles } from "../assets/styles/text.styles";

export default function PlaceCard({
  id,
  name,
  description,
  rating,
  primaryType,
  priceLevel,
  topTraits = [],
}: PlaceCardProps) {
  const router = useRouter();
  const formattedRating = rating.toFixed(1);

  const handleCardPress = () => {
    router.push({
      pathname: "/(place-profile)/place-profile",
      params: { id },
    });
  };

  const priceDisplay = (() => {
    switch (priceLevel) {
      case "INEXPENSIVE":
        return "$";
      case "MODERATE":
        return "$$";
      case "EXPENSIVE":
        return "$$$";
      default:
        return "";
    }
  })();

  return (
    <TouchableOpacity style={placeCardStyles.card} onPress={handleCardPress}>
      <Image
        source={require("@/assets/data/casa-images/casa1.jpg")}
        style={[
          StyleSheet.absoluteFillObject,
          { width: undefined, height: undefined, alignSelf: "stretch" },
        ]}
        resizeMode="cover"
      />

      <LinearGradient
        colors={[GRADIENT_COLORS.from, GRADIENT_COLORS.to]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={placeCardStyles.textContainer}>
        <View style={placeCardStyles.infoRow}>
          <Text style={[textStyles.heading3Text, placeCardStyles.cardTitle]}>
            {name}
          </Text>
          <View style={placeCardStyles.rating}>
            <AntDesign name="star" size={14} color="#f9db6f" />
            <Text
              style={[textStyles.informationsText, placeCardStyles.ratingText]}
            >
              {formattedRating}
            </Text>
          </View>
        </View>

        <View style={placeCardStyles.infoRow}>
          <Text
            style={[textStyles.informationsText, placeCardStyles.cardBodyText]}
          >
            {primaryType}
          </Text>
          <Text
            style={[textStyles.informationsText, placeCardStyles.cardBodyText]}
          >
            {priceDisplay}
          </Text>
        </View>

        <View style={placeCardStyles.traitsRow}>
          {topTraits.map((trait, index) => (
            <Text
              key={index}
              style={[textStyles.informationsText, placeCardStyles.traitText]}
            >
              {trait}
            </Text>
          ))}
        </View>
        <Text
          numberOfLines={1}
          style={[textStyles.captionsText, cardStyles.descriptionText]}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
