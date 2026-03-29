import { GRADIENT_COLORS } from "@/constants/gradient-colors";
import { formatPriceLevel } from "@/scripts/formatters";
import { PlaceCardProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cardStyles } from "@/assets/styles/shared/card.styles";
import { textStyles } from "@/assets/styles/shared/text.styles";
import { placeCardStyles } from "@/assets/styles/views/place-card.styles";

function PlaceCard({
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

  const priceDisplay = formatPriceLevel(priceLevel);

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

export default memo(PlaceCard);
