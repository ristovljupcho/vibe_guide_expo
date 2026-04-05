import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/shared/theme/useAppTheme';

type ToggleSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function ToggleSwitch({ value, onChange }: ToggleSwitchProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={({ pressed }) => [
        styles.track,
        {
          backgroundColor: value ? colors.primary : colors.secondary,
          opacity: pressed ? 0.88 : 1,
        },
      ]}>
      <View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: value ? 20 : 0 }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    height: 20,
    width: 20,
  },
  track: {
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 4,
    width: 48,
  },
});
