import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { VibeOffer } from '@/api';
import { bodyFontFamily, displayFontFamily, surfaceShadow } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type OfferCardProps = {
  offer: VibeOffer;
};

function getOfferColor(discount: string) {
  if (discount.includes('2-for-1')) {
    return '#FB7185';
  }

  if (discount.includes('30')) {
    return '#F97316';
  }

  if (discount.includes('20')) {
    return '#F59E0B';
  }

  return '#FF723F';
}

export function OfferCard({ offer }: OfferCardProps) {
  const { colors } = useAppTheme();

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
        <Image contentFit="cover" source={{ uri: offer.image }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: getOfferColor(offer.discount) }]}>
          <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>{offer.discount}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {offer.title}
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
            Valid until {offer.validUntil}
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
