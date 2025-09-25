import { textStyles } from "@/assets/styles/text.styles";
import { COLORS, TRANSPARENCY } from "@/constants/colors";
import { ORDER, PLACE_SORT } from "@/constants/sort";
import { TraitCarouselProps } from "@/scripts/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const POPUP_HEIGHT = SCREEN_HEIGHT * 0.75;

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

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
    togglePopup();
  };

  const resetFilters = () => {
    setSelectedTraits([]);
    setSelectedPriceLevel("");
    setSelectedSort("");
    setSelectedOrder("");
  };

  const renderItem = (
    label: string,
    selected: boolean,
    onPress: () => void,
    key: string
  ) => (
    <Pressable
      key={key}
      style={[styles.item, selected && styles.selectedItem]}
      onPress={onPress}
    >
      <Text style={[styles.itemText, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
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

      <Modal transparent visible={isOpen} animationType="fade">
        <TouchableWithoutFeedback onPress={togglePopup}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.popup, { height: POPUP_HEIGHT }]}>
          <View style={styles.popupHeader}>
            <Text style={[textStyles.heading2Text, styles.popupTitle]}>
              Filter Options
            </Text>
            <Pressable onPress={togglePopup}>
              <AntDesign name="close" size={24} color={COLORS.white} />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Traits */}
            <View style={styles.popupSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.popupText, textStyles.bodyText]}>
                  Traits
                </Text>
                {selectedTraits.length > 0 && (
                  <Pressable onPress={() => setSelectedTraits([])}>
                    <AntDesign
                      name="closecircle"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalWrapper}
              >
                {traits.map((trait) =>
                  renderItem(
                    trait.name,
                    selectedTraits.some((t) => t.name === trait.name),
                    () => toggleTrait(trait),
                    trait.name
                  )
                )}
              </ScrollView>
            </View>

            {/* Price level */}
            <View style={styles.popupSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.popupText, textStyles.bodyText]}>
                  Price level
                </Text>
                {selectedPriceLevel && (
                  <Pressable onPress={() => setSelectedPriceLevel("")}>
                    <AntDesign
                      name="closecircle"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalWrapper}
              >
                {Object.entries(priceDisplayMap).map(([key, symbol]) =>
                  renderItem(
                    symbol,
                    selectedPriceLevel === key,
                    () => setSelectedPriceLevel(key),
                    key
                  )
                )}
              </ScrollView>
            </View>

            {/* Sort */}
            <View style={styles.popupSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.popupText, textStyles.bodyText]}>
                  Sort by
                </Text>
                {selectedSort && (
                  <Pressable onPress={() => setSelectedSort("")}>
                    <AntDesign
                      name="closecircle"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalWrapper}
              >
                {PLACE_SORT.map((option) =>
                  renderItem(
                    option,
                    selectedSort === option,
                    () => setSelectedSort(option),
                    option
                  )
                )}
              </ScrollView>
            </View>

            {/* Order */}
            <View style={styles.popupSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.popupText, textStyles.bodyText]}>
                  Order
                </Text>
                {selectedOrder && (
                  <Pressable onPress={() => setSelectedOrder("")}>
                    <AntDesign
                      name="closecircle"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalWrapper}
              >
                {ORDER.map((option) =>
                  renderItem(
                    option,
                    selectedOrder === option,
                    () => setSelectedOrder(option),
                    option
                  )
                )}
              </ScrollView>
            </View>
          </ScrollView>
          {/* Reset + Apply */}
          <View style={styles.popupFooter}>
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
          </View>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.primary}${TRANSPARENCY[50]}`,
  },
  popupTitle: {
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  popupText: {
    color: COLORS.textPrimary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  item: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  itemText: {
    color: COLORS.white,
    textAlign: "center",
  },
  selectedItem: {
    backgroundColor: `${COLORS.primary}${TRANSPARENCY[20]}`,
    borderColor: `${COLORS.primary}${TRANSPARENCY[50]}`,
  },
  selectedText: {
    color: COLORS.white,
  },
  horizontalWrapper: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    alignItems: "center",
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
    color: `${COLORS.primary}${TRANSPARENCY[90]}`,
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
  popupFooter: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.overlay1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.primary}${TRANSPARENCY[50]}`,
  },
});
