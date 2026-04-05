import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/shared/theme/useAppTheme';

type IconName = ComponentProps<typeof Ionicons>['name'];

type ActionIconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  active?: boolean;
  activeColor?: string;
  size?: number;
};

export function ActionIconButton({
  icon,
  onPress,
  active = false,
  activeColor,
  size = 44,
}: ActionIconButtonProps) {
  const { colors } = useAppTheme();
  const tint = activeColor ?? colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: active ? `${tint}22` : colors.secondary,
          height: size,
          width: size,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}>
      <View>
        <Ionicons color={active ? tint : colors.text} name={icon} size={20} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
  },
});
