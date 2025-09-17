import { CardProps } from "@/scripts/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { cardStyles } from "../assets/styles/card.styles";
import { textStyles } from "../assets/styles/text.styles";
import { COLORS } from "../constants/colors";

export default function Card({
  name,
  description,
  placeName,
  startDate,
  endDate,
  image,
}: CardProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={cardStyles.card}>
      {/* Only render image if provided */}
      {image ? (
        <Image
          source={image}
          style={[
            StyleSheet.absoluteFillObject,
            { width: undefined, height: undefined, alignSelf: "stretch" },
          ]}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={["#FFD700", COLORS.primary]}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Overlay gradient (to make text visible on top of both image or background) */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={cardStyles.textContainer}>
        <Text style={[textStyles.heading3Text, cardStyles.cardTitle]}>
          {name}
        </Text>

        <View style={cardStyles.location}>
          <Ionicons name="location-outline" size={18} color={"#FAF6F9"} />
          <Text style={[textStyles.informationsText, cardStyles.text]}>
            {placeName}
          </Text>
        </View>

        <Text style={[textStyles.informationsText, cardStyles.timeText]}>
          {formatTime(start)} - {formatTime(end)}
        </Text>
        <Text
          numberOfLines={1}
          style={[textStyles.captionsText, cardStyles.descriptionText]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
