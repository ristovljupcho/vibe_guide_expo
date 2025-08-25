import { GRADIENT_COLORS } from "@/constants/gradient-colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { placeCardStyles } from "../assets/styles/place-card.styles";
import { cardStyles } from "../assets/styles/card.styles";
import { textStyles } from "../assets/styles/text.styles";

export type PlaceCardProps = {
  placeId: string;
  placeName: string;
  description: string;
  address: string;
  rating: number;
  primaryType: string;
  topTraits: string[];
};

export default function PlaceCard({
  placeId,
  placeName,
  description,
  address,
  rating,
  primaryType,
  topTraits = [],
}: PlaceCardProps) {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: "/(place-profile)/place-profile",
      params: { placeId },
    });
  };

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
            {placeName}
          </Text>
          <View style={placeCardStyles.rating}>
            <AntDesign name="star" size={14} color="#f9db6f" />
            <Text
              style={[textStyles.informationsText, placeCardStyles.ratingText]}
            >
              {rating}
            </Text>
          </View>
        </View>

        <View style={placeCardStyles.location}>
          <Ionicons name="location-outline" size={18} color={"#FAF6F9"} />
          <Text style={[textStyles.informationsText, placeCardStyles.text]}>
            {primaryType}
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
