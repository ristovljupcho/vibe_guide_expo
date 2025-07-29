import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { textStyles } from "@/styles/textStyles";
import {
  cardStyles,
  cardGradientFrom,
  cardGradientTo,
} from "@/styles/cardStyles";

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
    <View style={cardStyles.card} className="bg-slate-400">
      <Image
        source={image}
        style={[
          StyleSheet.absoluteFillObject,
          { width: undefined, height: undefined, alignSelf: "stretch" },
        ]}
        resizeMode="cover"
      />

      <LinearGradient
        colors={[cardGradientFrom, cardGradientTo]}
        style={StyleSheet.absoluteFillObject}
      />

      {isToday && (
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>
            {isEvent ? "TODAY" : "AVAILABLE NOW"}
          </Text>
        </View>
      )}

      <View style={cardStyles.textContainer}>
        <Text
          style={[textStyles.text, textStyles.headingText, textStyles.boldText]}
        >
          {isEvent ? eventName : placeName}
        </Text>
        {isEvent && (
          <Text style={[textStyles.text, textStyles.subheadingText]}>
            {placeName}
          </Text>
        )}
        <Text style={[textStyles.text, textStyles.captionsText]}>
          {formatTime(start)} - {formatTime(end)}
        </Text>
        <Text
          numberOfLines={1}
          style={[textStyles.text, textStyles.captionsText]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
