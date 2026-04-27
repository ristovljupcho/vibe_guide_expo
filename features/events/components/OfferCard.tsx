import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Offer, OfferResponseDto } from '@/api/types';
import { bodyFontFamily, displayFontFamily, surfaceShadow } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type OfferCardProps = {
  offer: Offer | OfferResponseDto;
  badge?: string;
};

function getOfferColor(badge: string) {
  if (badge === 'Active') {
    return '#FB7185';
  }

  if (badge === 'Upcoming') {
    return '#3B82F6';
  }

  return '#FF723F';
}

export function OfferCard({ offer, badge }: OfferCardProps) {
  const { colors } = useAppTheme();
  const resolvedBadge = 'badge' in offer ? offer.badge : badge ?? 'Offer';
  const imageUri = 'image' in offer ? offer.image : offer.imageUrl;
  const title = 'title' in offer ? offer.title : offer.name;
  const validUntil =
    'validUntil' in offer
      ? offer.validUntil
      : new Date(offer.endDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        surfaceShadow,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}>
      <View style={styles.imageWrap}>
        <Image contentFit="cover" source={{ uri: imageUri }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: getOfferColor(resolvedBadge) }]}>
          <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>{resolvedBadge}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons color={colors.mutedForeground} name="location-outline" size={14} />
          <Text numberOfLines={1} style={[styles.metaText, { color: colors.mutedForeground }]}>
            {offer.placeName}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons color={colors.mutedForeground} name="time-outline" size={14} />
          <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
            Valid until {validUntil}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    minHeight: 28,
    minWidth: 82,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  badgeText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 280,
  },
  content: {
    gap: 8,
    padding: 14,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageWrap: {
    height: 168,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  metaText: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  title: {
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
});
