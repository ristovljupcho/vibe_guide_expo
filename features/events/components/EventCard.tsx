import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { VibeEvent } from '@/api';
import { bodyFontFamily, displayFontFamily, surfaceShadow } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type EventCardProps = {
  event: VibeEvent;
  compact?: boolean;
};

const eventColorMap: Record<string, string> = {
  'Live Music': '#EF4444',
  Party: '#EC4899',
  DJ: '#A855F7',
  'Special Event': '#F59E0B',
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const { colors } = useAppTheme();
  const badgeColor = eventColorMap[event.type] ?? colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        surfaceShadow,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
          width: compact ? 260 : 280,
        },
      ]}>
      <View style={styles.imageWrap}>
        <Image contentFit="cover" source={{ uri: event.image }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>{event.type}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {event.title}
        </Text>
        <View style={styles.metaGroup}>
          <MetaRow color={colors.mutedForeground} icon="location-outline" text={event.placeName} />
          <MetaRow color={colors.mutedForeground} icon="calendar-outline" text={event.date} />
          <MetaRow color={colors.mutedForeground} icon="time-outline" text={event.time} />
        </View>
      </View>
    </Pressable>
  );
}

function MetaRow({
  icon,
  text,
  color,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  text: string;
  color: string;
}) {
  return (
    <View style={styles.metaRow}>
      <Ionicons color={color} name={icon} size={14} />
      <Text numberOfLines={1} style={[styles.metaText, { color }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    left: 12,
    minHeight: 28,
    minWidth: 84,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
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
  },
  content: {
    gap: 10,
    padding: 14,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageWrap: {
    height: 168,
    overflow: 'hidden',
  },
  metaGroup: {
    gap: 6,
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
