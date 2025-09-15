import { textStyles } from "@/assets/styles/text.styles";
import { COLORS } from "@/constants/colors";
import { ORDER, PLACE_SORT } from "@/constants/sort";
import { TraitCarouselProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
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
  onApplyFilters?: (
    selectedTraits: TraitCarouselProps[],
    selectedPriceLevel: string,
    selectedSort: string,
    selectedOrder: string
  ) => void;
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
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");

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

  // Price level map for display symbols
  const priceDisplayMap: Record<string, string> = {
    INEXPENSIVE: "$",
    MODERATE: "$$",
    EXPENSIVE: "$$$",
  };

  const applyFilters = () => {
    if (onApplyFilters)
      onApplyFilters(
        selectedTraits,
        selectedPriceLevel,
        selectedSort,
        selectedOrder
      );
    closePopup();
  };

  const resetFilters = () => {
    setSelectedTraits([]);
    setSelectedPriceLevel("");
    setSelectedSort("");
    setSelectedOrder("");
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
          <View style={styles.popupHeader}>
            <Text style={[textStyles.heading2Text, styles.popupTitle]}>
              Filter Options
            </Text>
            <Pressable onPress={() => closePopup()}>
              <AntDesign name="close" size={24} color={COLORS.white} />
            </Pressable>
          </View>

          {/* Traits */}
          <View style={styles.popupSection}>
            <Text style={[styles.popupText, textStyles.bodyText]}>Traits</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.traitsWrapper}
              style={{ flexGrow: 0 }}
            >
              {traits.map((trait) => {
                const isSelected = selectedTraits.some(
                  (t) => t.name === trait.name
                );
                return (
                  <Pressable
                    key={trait.name}
                    onPress={() => toggleTrait(trait)}
                    style={[styles.item, isSelected && styles.traitSelected]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        textStyles.bodyText,
                        isSelected && styles.traitTextSelected,
                      ]}
                    >
                      {trait.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Price level selector */}
          <View style={styles.popupSection}>
            <Text style={[styles.popupText, textStyles.bodyText]}>
              Price level
            </Text>
            <View style={styles.priceWrapper}>
              {Object.entries(priceDisplayMap).map(([key, symbol]) => {
                const isSelected = selectedPriceLevel === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setSelectedPriceLevel(key)}
                    style={[styles.item, isSelected && styles.selectedItemText]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        textStyles.bodyText,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {symbol}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Sort selector */}
          <View style={styles.popupSection}>
            <Text style={[styles.popupText, textStyles.bodyText]}>Sort by</Text>
            <View style={styles.priceWrapper}>
              {PLACE_SORT.map((option) => {
                const isSelected = selectedSort === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedSort(option)}
                    style={[styles.item, isSelected && styles.selectedItemText]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        textStyles.bodyText,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Order selector */}
          <View style={styles.popupSection}>
            <Text style={[styles.popupText, textStyles.bodyText]}>Order</Text>
            <View style={styles.priceWrapper}>
              {ORDER.map((option) => {
                const isSelected = selectedOrder === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedOrder(option)}
                    style={[styles.item, isSelected && styles.selectedItemText]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        textStyles.bodyText,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Reset Filters Row */}
          <View style={styles.resetRow}>
            <Pressable onPress={resetFilters}>
              <Text style={[textStyles.informationsText, styles.resetText]}>
                Reset Filters
              </Text>
            </Pressable>
          </View>

          <Pressable style={styles.applyButton} onPress={applyFilters}>
            <Text style={[textStyles.bodyText, styles.applyButtonText]}>
              Apply Filters
            </Text>
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
  popupSection: {
    borderBottomColor: COLORS.overlay1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.overlay1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  popupTitle: {
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  popupText: {
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  item: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  itemText: {
    color: COLORS.white,
    textAlign: "center",
  },
  selectedItemText: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  traitsWrapper: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  traitSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  traitTextSelected: {
    color: COLORS.white,
  },
  priceWrapper: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  resetRow: {
    marginTop: 12,
    alignItems: "flex-end",
    paddingHorizontal: 4,
  },
  resetText: {
    color: COLORS.primary,
    textDecorationLine: "underline",
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
  },
});
