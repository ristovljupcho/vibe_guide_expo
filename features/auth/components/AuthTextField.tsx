import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily } from '@/shared/ui/tokens';

type AuthTextFieldProps = TextInputProps & {
  error?: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onToggleSecure?: () => void;
  secureVisible?: boolean;
};

export function AuthTextField({
  error,
  icon,
  label,
  onToggleSecure,
  secureTextEntry,
  secureVisible,
  style,
  ...textInputProps
}: AuthTextFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <Ionicons color={Colors.dark.mutedForeground} name={icon} size={20} />
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={Colors.dark.mutedForeground}
          secureTextEntry={secureTextEntry}
          selectionColor={Colors.dark.primary}
          style={[styles.input, style]}
          {...textInputProps}
        />
        {onToggleSecure ? (
          <Pressable hitSlop={12} onPress={onToggleSecure}>
            <Ionicons
              color={Colors.dark.mutedForeground}
              name={secureVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.dark.destructive,
    fontFamily: bodyFontFamily,
    fontSize: 12,
    lineHeight: 18,
  },
  input: {
    color: Colors.dark.text,
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 15,
    minHeight: 52,
    paddingVertical: 0,
  },
  inputError: {
    borderColor: Colors.dark.destructive,
  },
  inputRow: {
    alignItems: 'center',
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  label: {
    color: Colors.dark.text,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  wrap: {
    gap: 8,
  },
});
