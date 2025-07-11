import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Styles
import { textStyles } from "@/styles/textStyles";
import {
  cardGradientFrom,
  cardGradientTo,
  cardStyles,
} from "@/styles/cardStyles";

type EventCardProps = {
  eventName: string;
  placeName: string;
  description: string;
  startDate: string;
  endDate: string;
  images: ImageSourcePropType[];
};

export default function EventCard({
  eventName,
  placeName,
  description,
  startDate,
  endDate,
  images,
}: EventCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const isToday =
    start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleNext = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <View style={cardStyles.card}>
      <Image
        source={images[currentImage]}
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
          <Text style={cardStyles.badgeText}>TODAY</Text>
        </View>
      )}

      <View style={cardStyles.textContainer}>
        <Text
          style={[textStyles.text, textStyles.headingText, textStyles.boldText]}
        >
          {eventName}
        </Text>
        <Text style={[textStyles.text, textStyles.subheadingText]}>
          {placeName}
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

      {images.length > 1 && (
        <TouchableOpacity
          style={cardStyles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={cardStyles.nextButtonText}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
