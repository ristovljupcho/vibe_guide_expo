import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { textStyles } from "@/styles/textStyles";

type IconProps = {
  imageSrc: ImageSourcePropType;
  caption: string;
  backgroundColor?: string;
  index: number;
};

export default function Icon({
  imageSrc,
  caption,
  backgroundColor = "rgba(97, 97, 97, 0.2)",
  index,
}: IconProps) {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.iconWrapper, { backgroundColor: backgroundColor }]}>
        <Image source={imageSrc} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={[textStyles.text, textStyles.captionsText, styles.iconText]}>
        {caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "80%",
    height: "80%",
  },
  iconText: {
    textAlign: "center",
    marginTop: 5,
  },
});
