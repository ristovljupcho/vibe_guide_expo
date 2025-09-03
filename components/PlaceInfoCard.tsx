import { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

type PlaceInfoCardProps = {
  rating: number;
  type: string;
  priceLevel: string;
  address: string;
  workingHours: { days: string; hours: string }[];
  description: string;
};

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PlaceInfoCard({
  rating,
  type,
  priceLevel,
  address,
  workingHours,
  description,
}: PlaceInfoCardProps) {
  const [expanded, setExpanded] = useState(false);

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

  const displayedText = expanded
    ? description
    : description.length > 50
    ? description.slice(0, 50) + "..."
    : description;

  const toggleDescription = () => {
    LayoutAnimation.configureNext({
      duration: 10000, // 1 second
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleY,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleY,
      },
    });
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.topColumn}>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="#FFDE21" />
            <Text style={styles.topText}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.topColumn}>
          <Text style={styles.topText}>{type}</Text>
        </View>

        <View style={styles.topColumn}>
          <Text style={styles.topText}>{priceDisplay}</Text>
        </View>
      </View>

      {/* Address */}
      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={16} color="#FAF6F9" />
        <Text style={styles.addressText}>{address}</Text>
      </View>

      {/* Working Hours */}
      {workingHours.map((wh, idx) => (
        <View key={idx} style={styles.hoursRow}>
          <AntDesign name="clockcircleo" size={16} color="#FAF6F9" />
          <Text style={styles.hoursText}>
            {wh.days} : {wh.hours}
          </Text>
        </View>
      ))}

      {/* Description */}
      <View style={styles.descriptionRow}>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.descriptionText}>{displayedText}</Text>
          {description.length > 50 && (
            <Text style={styles.readMore}>
              {expanded ? "Read less ▲" : "Read more ▼"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  topColumn: {
    flex: 1,
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  topText: {
    color: "#FAF6F9",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addressText: {
    color: "#FAF6F9",
    marginLeft: 5,
    fontSize: 13,
  },
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  hoursText: {
    color: "#FAF6F9",
    marginLeft: 5,
    fontSize: 13,
  },
  descriptionRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  descriptionText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 18,
  },
  readMore: {
    fontSize: 12,
    marginTop: 5,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
