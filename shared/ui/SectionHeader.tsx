import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
};

export function SectionHeader({ title, actionLabel, onPress }: SectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onPress} style={styles.action}>
          <Text style={[styles.actionLabel, { color: colors.primary }]}>{actionLabel}</Text>
          <Ionicons color={colors.primary} name="chevron-forward" size={14} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  actionLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: displayFontFamily,
    fontSize: 22,
    fontWeight: '600',
  },
});
