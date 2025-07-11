import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import events from "../data/EventResponseDTO.json";
import image1 from "../data/event-1.jpg";
import image2 from "../data/event-2.jpg";
import EventCard from "./event-card";

export default function EventDisplay() {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => `${item.eventName}-${index}`}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <EventCard
            eventName={item.eventName}
            placeName={item.placeName}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
            images={[image1, image2]}
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
