import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import dailyOffers from "../data/DailyOfferResponseDTO.json";
import image from "../data/event-1.jpg";
import DailyOfferCard from "./daily-offer-card";

export default function DailyOfferDisplay() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dailyOffers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <DailyOfferCard
            name={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
            description={item.description}
            image={image}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
  },
});
