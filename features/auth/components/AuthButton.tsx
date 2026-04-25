import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { bodyFontFamily, surfaceShadow } from '@/shared/ui/tokens';
import { Colors } from '@/shared/theme/colors';

type AuthButtonVariant = 'primary' | 'secondary' | 'ghost';

type AuthButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: AuthButtonVariant;
  style?: ViewStyle;
};

export function AuthButton({
  label,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  style,
}: AuthButtonProps) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        !isPrimary && {
          backgroundColor: isGhost ? 'transparent' : Colors.dark.secondary,
          borderColor: Colors.dark.border,
          borderWidth: 1,
        },
        {
          opacity: disabled ? 0.48 : pressed ? 0.88 : 1,
        },
        style,
      ]}>
      {isPrimary ? (
        <LinearGradient
          colors={[Colors.dark.primary, Colors.dark.accent]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.gradient}>
          {loading ? (
            <ActivityIndicator color={Colors.dark.primaryForeground} />
          ) : (
            <Text style={styles.primaryText}>{label}</Text>
          )}
        </LinearGradient>
      ) : loading ? (
        <ActivityIndicator color={Colors.dark.primary} />
      ) : (
        <Text style={[styles.secondaryText, isGhost && { color: Colors.dark.primary }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 54,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 54,
    paddingHorizontal: 18,
    ...surfaceShadow,
  },
  primaryText: {
    color: Colors.dark.primaryForeground,
    fontFamily: bodyFontFamily,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryText: {
    color: Colors.dark.text,
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
