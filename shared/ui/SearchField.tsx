import type { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { bodyFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type SearchFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  rightAccessory?: ReactNode;
};

export function SearchField({
  placeholder,
  value,
  onChangeText,
  rightAccessory,
}: SearchFieldProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <Ionicons color={colors.mutedForeground} name="search-outline" size={20} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { color: colors.text }]}
        value={value}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')}>
          <Ionicons color={colors.mutedForeground} name="close" size={18} />
        </Pressable>
      ) : null}
      {rightAccessory}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 10,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    paddingVertical: 12,
  },
});
