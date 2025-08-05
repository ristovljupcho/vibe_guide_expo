import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cardStyles } from "../assets/styles/card.styles";
import { textStyles } from "../assets/styles/text.styles";
import { GRADIENT_COLORS } from "../constants/gradient-colors";

export type CardProps = {
  eventName?: string;
  placeName: string;
  startDate: string;
  endDate: string;
  description: string;
  image: ImageSourcePropType;
};

export default function Card({
  eventName,
  placeName,
  startDate,
  endDate,
  description,
  image,
}: CardProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const isToday =
    start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isEvent = !!eventName;

  return (
    <View style={cardStyles.card}>
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

      {isToday && (
        <View>
          <Text>{isEvent ? "TODAY" : "AVAILABLE NOW"}</Text>
        </View>
      )}

      <View style={cardStyles.textContainer}>
        <Text style={[textStyles.heading3Text, cardStyles.cardTitle]}>
          {isEvent ? eventName : placeName}
        </Text>
        {isEvent && (
          <View style={cardStyles.location}>
            <Ionicons name="location-outline" size={18} color={"#FAF6F9"} />
            <Text style={[textStyles.informationsText, cardStyles.text]}>
              {placeName}
            </Text>
          </View>
        )}
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
