import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { bodyFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type FilterChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  fullWidth?: boolean;
  tone?: 'primary' | 'accent' | 'neutral';
};

export function FilterChip({
  label,
  selected = false,
  onPress,
  onRemove,
  fullWidth = false,
  tone = 'primary',
}: FilterChipProps) {
  const { colors } = useAppTheme();

  const selectedBackground =
    tone === 'accent' ? colors.accent : tone === 'neutral' ? colors.text : colors.primary;

  const foreground = selected ? colors.primaryForeground : colors.text;

  return (
    <View
      style={[
        styles.chip,
        {
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          backgroundColor: selected ? selectedBackground : colors.secondary,
        },
      ]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.labelButton,
          { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}>
        <Text style={[styles.label, { color: foreground }]}>{label}</Text>
      </Pressable>

      {onRemove ? (
        <Pressable hitSlop={6} onPress={onRemove} style={styles.removeButton}>
          <View style={[styles.removeCircle, { backgroundColor: `${foreground}30` }]}>
            <Ionicons color={foreground} name="close" size={10} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    minHeight: 38,
    overflow: 'hidden',
    paddingRight: 10,
  },
  labelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '600',
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  removeCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
});
