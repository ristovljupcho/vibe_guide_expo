import { COLORS } from "@/constants/colors";
import { TraitCarouselProps } from "@/scripts/types";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { textStyles } from "../assets/styles/text.styles";

type FilterPopupProps = {
  traits: TraitCarouselProps[];
  visible: boolean;
  onClose: () => void;
};

export default function FilterPopup({
  traits,
  visible,
  onClose,
}: FilterPopupProps) {
  const slideAnim = useRef(new Animated.Value(300)).current; // start off-screen

  // Animate slide in/out
  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Dimmed background */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Popup */}
      <Animated.View
        style={[
          styles.modalContent,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text
          style={[
            textStyles.heading3Text,
            styles.title,
            { color: COLORS.textPrimary },
          ]}
        >
          Filter Options
        </Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Sort by Name selected")}
        >
          <Text style={styles.menuItemText}>Sort by Name</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Sort by Rating selected")}
        >
          <Text style={styles.menuItemText}>Sort by Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
          <Text style={[styles.button, textStyles.bodyText]}>
            Apply Filters
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay1,
  },
  modalContent: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 0,
  },
  title: {
    alignSelf: "flex-start",
    letterSpacing: 3,
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.overlay3,
  },
  menuItem: {
    paddingVertical: 12,
    width: "100%",
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  button: {
    color: COLORS.textPrimary,
    backgroundColor: COLORS.light,
    opacity: 0.5,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0,
    paddingVertical: 20,
    textAlign: "center",
  },
});
