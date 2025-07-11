import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
// Styles
import { LinearGradient } from "expo-linear-gradient";
import { textStyles } from "@/styles/textStyles";
import { cardStyles } from "@/styles/cardStyles";
import { cardGradientFrom } from "@/styles/cardStyles";
import { cardGradientTo } from "@/styles/cardStyles";

type DailyOfferCardProps = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: ImageSourcePropType;
};

export default function DailyOfferCard({
  name,
  startDate,
  endDate,
  description,
  image,
}: DailyOfferCardProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const isToday =
    start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
        colors={[cardGradientFrom, cardGradientTo]}
        style={StyleSheet.absoluteFillObject}
      />

      {isToday && (
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>AVAILABLE NOW</Text>
        </View>
      )}

      <View style={cardStyles.textContainer}>
        <Text
          style={[textStyles.text, textStyles.headingText, textStyles.boldText]}
        >
          {name}
        </Text>
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
