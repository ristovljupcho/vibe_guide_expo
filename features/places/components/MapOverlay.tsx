import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import type { Place } from '@/api/types';
import { bodyFontFamily, displayFontFamily, surfaceShadow } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type MapOverlayProps = {
  visible: boolean;
  places: Place[];
  onClose: () => void;
  onSelectPlace: (placeId: string) => void;
};

export function MapOverlay({ visible, places, onClose, onSelectPlace }: MapOverlayProps) {
  const { colors } = useAppTheme();
  const { width, height } = useWindowDimensions();
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const mapHeight = Math.max(420, height - 220);
  const mappablePlaces = places.filter((place) => place.mapPosition);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSelectedPlaceId(mappablePlaces[0]?.id ?? null);
  }, [mappablePlaces, visible]);

  const selectedPlace = mappablePlaces.find((place) => place.id === selectedPlaceId) ?? null;

  return (
    <Modal animationType="slide" presentationStyle="fullScreen" visible={visible}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Places Near You</Text>
            <View style={styles.locationRow}>
              <Ionicons color={colors.mutedForeground} name="locate-outline" size={12} />
              <Text style={[styles.locationText, { color: colors.mutedForeground }]}>
                {selectedPlace?.location || 'Live data map'}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Ionicons color={colors.text} name="close" size={22} />
          </Pressable>
        </View>

        <View style={[styles.mapStage, { backgroundColor: colors.mapBackground }]}>
          <View style={[styles.grid, { width, height: mapHeight }]}>
            <View style={[styles.bluePulse, { left: width / 2 - 12, top: mapHeight / 2 - 12 }]} />
            <View style={[styles.blueDot, { left: width / 2 - 6, top: mapHeight / 2 - 6 }]} />

            {mappablePlaces.map((place) => {
              if (!place.mapPosition) {
                return null;
              }

              const left = (place.mapPosition.left / 100) * (width - 48) + 12;
              const top = (place.mapPosition.top / 100) * mapHeight;

              return (
                <Pressable
                  key={place.id}
                  onPress={() => setSelectedPlaceId(place.id)}
                  style={({ pressed }) => [
                    styles.marker,
                    {
                      left,
                      top,
                      backgroundColor: selectedPlaceId === place.id ? colors.primary : colors.accent,
                      opacity: pressed ? 0.84 : 1,
                      transform: [{ scale: pressed ? 0.96 : 1 }],
                    },
                  ]}>
                  <Ionicons color={colors.primaryForeground} name="location" size={20} />
                </Pressable>
              );
            })}

            {mappablePlaces.length === 0 ? (
              <View style={styles.emptyMapState}>
                <Ionicons color={colors.mutedForeground} name="map-outline" size={44} />
                <Text style={[styles.emptyMapTitle, { color: colors.text }]}>Map unavailable</Text>
                <Text style={[styles.emptyMapText, { color: colors.mutedForeground }]}>
                  The backend is not providing coordinates for places yet.
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {selectedPlace ? (
          <View style={[styles.bottomCardWrap, { borderTopColor: colors.border }]}>
            <View style={[styles.bottomCard, surfaceShadow, { backgroundColor: colors.card }]}>
              <Image contentFit="cover" source={{ uri: selectedPlace.image }} style={styles.bottomCardImage} />
              <View style={styles.bottomCardBody}>
                <Text numberOfLines={1} style={[styles.bottomCardTitle, { color: colors.text }]}>
                  {selectedPlace.name}
                </Text>
                <View style={styles.bottomCardMeta}>
                  <Ionicons color={colors.mutedForeground} name="location-outline" size={14} />
                  <Text style={[styles.bottomCardMetaText, { color: colors.mutedForeground }]}>
                    {selectedPlace.location}
                  </Text>
                  <Ionicons color={colors.primary} name="star" size={14} />
                  <Text style={[styles.bottomCardMetaText, { color: colors.text }]}>
                    {selectedPlace.rating ?? 4.5}
                  </Text>
                </View>
                <Pressable
                  onPress={() => onSelectPlace(selectedPlace.id)}
                  style={({ pressed }) => [
                    styles.viewDetailsButton,
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}>
                  <Text style={[styles.viewDetailsText, { color: colors.primaryForeground }]}>
                    View Details
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blueDot: {
    backgroundColor: '#3B82F6',
    borderColor: '#FFFFFF',
    borderRadius: 999,
    borderWidth: 2,
    height: 12,
    position: 'absolute',
    width: 12,
  },
  bluePulse: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderRadius: 999,
    height: 24,
    position: 'absolute',
    width: 24,
  },
  bottomCard: {
    borderRadius: 24,
    flexDirection: 'row',
    gap: 12,
    overflow: 'hidden',
    padding: 12,
  },
  bottomCardBody: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  bottomCardImage: {
    borderRadius: 18,
    height: 116,
    width: 116,
  },
  bottomCardMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bottomCardMetaText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  bottomCardTitle: {
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  bottomCardWrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  container: {
    flex: 1,
  },
  emptyMapState: {
    alignItems: 'center',
    left: 0,
    paddingHorizontal: 24,
    position: 'absolute',
    right: 0,
    top: '38%',
  },
  emptyMapText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyMapTitle: {
    fontFamily: displayFontFamily,
    fontSize: 22,
    fontWeight: '600',
    marginTop: 12,
  },
  grid: {
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerTitle: {
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  mapStage: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
    borderRadius: 999,
    height: 42,
    justifyContent: 'center',
    position: 'absolute',
    width: 42,
  },
  viewDetailsButton: {
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  viewDetailsText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
});
