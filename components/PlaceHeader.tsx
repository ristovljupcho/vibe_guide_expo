import { textStyles } from "@/assets/styles/text.styles";
import { COLORS } from "@/constants/colors";
import { TraitCarouselProps } from "@/scripts/types";
import Feather from "@expo/vector-icons/Feather";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const POPUP_HEIGHT = SCREEN_HEIGHT * 0.7;

type PlaceHeaderProps = {
  onSmilePress?: () => void;
  traits?: TraitCarouselProps[];
  onApplyFilters?: (selectedTraits: TraitCarouselProps[]) => void;
};

export default function PlaceHeader({
  onSmilePress,
  traits = [],
  onApplyFilters,
}: PlaceHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<TraitCarouselProps[]>(
    []
  );

  // Slide animation
  const slideAnim = useRef(new Animated.Value(POPUP_HEIGHT)).current;
  const pan = useRef(new Animated.Value(0)).current;
  const translateY = Animated.add(slideAnim, pan);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) pan.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > POPUP_HEIGHT / 3) closePopup();
        else
          Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  const openPopup = () => {
    setIsOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    Animated.timing(slideAnim, {
      toValue: POPUP_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      pan.setValue(0);
    });
  };

  const togglePopup = () => {
    if (isOpen) closePopup();
    else openPopup();

    if (onSmilePress) onSmilePress();
  };

  const toggleTrait = (trait: TraitCarouselProps) => {
    const exists = selectedTraits.find((t) => t.name === trait.name);
    if (exists) {
      setSelectedTraits(selectedTraits.filter((t) => t.name !== trait.name));
    } else {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const applyFilters = () => {
    if (onApplyFilters) onApplyFilters(selectedTraits);
    closePopup();
  };

  const renderTrait = ({ item }: { item: TraitCarouselProps }) => {
    const isSelected = selectedTraits.some((t) => t.name === item.name);
    return (
      <Pressable
        onPress={() => toggleTrait(item)}
        style={[styles.traitItem, isSelected && styles.traitSelected]}
      >
        <Text
          style={[
            styles.traitText,
            textStyles.bodyText,
            isSelected && styles.traitTextSelected,
          ]}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      {/* Header */}
      <View style={styles.container}>
        <Text style={[textStyles.heading2Text, styles.title]}>Places</Text>

        <Pressable onPress={togglePopup} style={styles.iconContainer}>
          <Feather
            name="filter"
            size={24}
            color={isOpen ? COLORS.primary : COLORS.white}
          />
        </Pressable>
      </View>

      {/* Modal */}
      <Modal transparent visible={isOpen} animationType="fade">
        {/* Dimmed background */}
        <TouchableWithoutFeedback onPress={closePopup}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        {/* Draggable bottom sheet */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.popup,
            { height: POPUP_HEIGHT, transform: [{ translateY }] },
          ]}
        >
          <Text style={[textStyles.heading2Text, styles.popupTitle]}>
            Filter Options
          </Text>

          <FlatList
            data={traits}
            keyExtractor={(item) => item.name}
            renderItem={renderTrait}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              alignItems: "flex-start",
            }}
          />

          <Pressable style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.overlay2,
  },
  title: {
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  iconContainer: {
    padding: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 18, 0.4)",
  },
  popup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2A2A2B",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    marginHorizontal: 5,
  },
  popupTitle: {
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  traitItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 8,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start", // make the item wrap content
  },
  traitSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  traitText: {
    color: COLORS.white,
  },
  traitTextSelected: {
    color: COLORS.white,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
