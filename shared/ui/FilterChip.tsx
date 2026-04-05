import { Pressable, StyleSheet, Text } from 'react-native';

import { bodyFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type FilterChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  fullWidth?: boolean;
  tone?: 'primary' | 'accent' | 'neutral';
};

export function FilterChip({
  label,
  selected = false,
  onPress,
  fullWidth = false,
  tone = 'primary',
}: FilterChipProps) {
  const { colors } = useAppTheme();

  const selectedBackground =
    tone === 'accent' ? colors.accent : tone === 'neutral' ? colors.text : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          backgroundColor: selected ? selectedBackground : colors.secondary,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}>
      <Text
        style={[
          styles.label,
          {
            color: selected ? colors.primaryForeground : colors.text,
          },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    minHeight: 38,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '600',
  },
});
