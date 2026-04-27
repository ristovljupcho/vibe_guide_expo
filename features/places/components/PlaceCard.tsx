import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Place, PlaceCardResponseDto } from '@/api/types';
import { formatEnumLabel, mapPriceLevel } from '@/api/apiUtils';
import { useAppTheme } from '@/shared/theme/useAppTheme';
import { bodyFontFamily, displayFontFamily, surfaceShadow } from '@/shared/ui/tokens';

type PlaceCardProps = {
  place: Place | PlaceCardResponseDto;
  onPress?: (placeId: string) => void;
  compact?: boolean;
};

export function PlaceCard({ place, onPress, compact = false }: PlaceCardProps) {
  const { colors } = useAppTheme();
  const [saved, setSaved] = useState(false);
  const isMappedPlace = 'image' in place;
  const imageUri = isMappedPlace ? place.image : place.imageUrls?.[0] ?? '';
  const location = isMappedPlace ? place.location : place.address ?? '';
  const type = isMappedPlace ? place.type : formatEnumLabel(place.primaryType);
  const price = isMappedPlace ? place.price : mapPriceLevel(place.priceLevel);
  const traits = isMappedPlace ? place.traits : place.topTraits ?? [];

  return (
    <Pressable
      onPress={() => onPress?.(place.id)}
      style={({ pressed }) => [
        styles.card,
        surfaceShadow,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
          width: compact ? 258 : 280,
        },
      ]}>
      <View style={styles.imageWrap}>
        <Image contentFit="cover" source={{ uri: imageUri }} style={styles.image} />
        <Pressable
          onPress={() => setSaved((current) => !current)}
          style={({ pressed }) => [
            styles.favoriteButton,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.42)',
              opacity: pressed ? 0.82 : 1,
            },
          ]}>
          <Ionicons color={saved ? colors.primary : '#FFFFFF'} name={saved ? 'heart' : 'heart-outline'} size={20} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
            {place.name}
          </Text>
          {place.rating ? (
            <View style={styles.ratingRow}>
              <Ionicons color={colors.primary} name="star" size={14} />
              <Text style={[styles.ratingText, { color: colors.text }]}>{place.rating}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.locationRow}>
          <Ionicons color={colors.mutedForeground} name="location-outline" size={14} />
          <Text numberOfLines={1} style={[styles.locationText, { color: colors.mutedForeground }]}>
            {location}
            {isMappedPlace && place.distance ? ` - ${place.distance}` : ''}
          </Text>
        </View>

        <View style={styles.tagsWrap}>
          {traits.slice(0, 3).map((trait) => (
            <View key={trait} style={[styles.tag, { backgroundColor: `${colors.accent}20` }]}>
              <Text style={[styles.tagText, { color: colors.accent }]}>{trait}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metaInline}>
          <Text numberOfLines={1} style={[styles.metaInlineText, { color: colors.mutedForeground }]}>
            {type}
          </Text>
          {price ? (
            <Text numberOfLines={1} style={[styles.metaInlineText, { color: colors.mutedForeground }]}>
              {price}
            </Text>
          ) : null}
        </View>

        <Text numberOfLines={1} style={[styles.description, { color: colors.mutedForeground }]}>
          {place.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    gap: 8,
    padding: 14,
  },
  description: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    lineHeight: 18,
  },
  favoriteButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 38,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 38,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageWrap: {
    height: 176,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  metaInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaInlineText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  locationText: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '700',
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontFamily: bodyFontFamily,
    fontSize: 11,
    fontWeight: '700',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    flex: 1,
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
