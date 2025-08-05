import { GRADIENT_COLORS } from "@/constants/gradient-colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { placeCardStyles } from "../assets/styles/place-card.styles";
import { textStyles } from "../assets/styles/text.styles";

export type PlaceCardProps = {
  placeName: string;
  location: string;
  rating: number;
  description: string;
  traits: string[];
  image: any;
};

export default function PlaceCard({
  placeName,
  location,
  rating,
  description,
  traits,
  image,
}: PlaceCardProps) {
  return (
    <View style={placeCardStyles.card}>
      <Image
        source={image}
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
            {location}
          </Text>
        </View>
        <View style={placeCardStyles.traitsRow}>
          {traits.map((trait, index) => (
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
          style={[textStyles.captionsText, placeCardStyles.descriptionText]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
