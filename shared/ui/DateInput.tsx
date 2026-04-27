import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/shared/theme/useAppTheme';
import { bodyFontFamily } from '@/shared/ui/tokens';

type DateInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Earliest selectable date in YYYY-MM-DD format. */
  min?: string;
};

function toDate(dateStr: string): Date {
  return dateStr ? new Date(`${dateStr}T00:00:00`) : new Date();
}

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(dateStr: string): string {
  if (!dateStr) return 'Select a date';
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DateInput({ label, value, onChange, error, min }: DateInputProps) {
  const { colors } = useAppTheme();
  const [showPicker, setShowPicker] = useState(false);

  const borderColor = error ? colors.destructive : colors.border;
  const minDate = min ? toDate(min) : undefined;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {React.createElement('input', {
          type: 'date',
          value: value ?? '',
          min: min ?? '',
          onChange: (e: { target: { value: string } }) => onChange(e.target.value),
          style: {
            backgroundColor: colors.secondary,
            border: `1px solid ${borderColor}`,
            borderRadius: 12,
            boxSizing: 'border-box',
            color: colors.text,
            cursor: 'pointer',
            fontFamily: bodyFontFamily,
            fontSize: 14,
            height: 44,
            outline: 'none',
            paddingLeft: 14,
            paddingRight: 14,
            width: '100%',
          },
        })}
        {error ? (
          <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
        ) : null}
      </View>
    );
  }

  // iOS / Android — show a pressable trigger that opens the native picker.
  function handleNativeChange(_event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selected) {
      onChange(toDateString(selected));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

      <Pressable
        onPress={() => setShowPicker(true)}
        style={({ pressed }) => [
          styles.trigger,
          {
            backgroundColor: colors.secondary,
            borderColor,
            opacity: pressed ? 0.8 : 1,
          },
        ]}>
        <Ionicons color={value ? colors.text : colors.mutedForeground} name="calendar-outline" size={16} />
        <Text style={[styles.triggerText, { color: value ? colors.text : colors.mutedForeground }]}>
          {formatDisplay(value)}
        </Text>
      </Pressable>

      {showPicker ? (
        <DateTimePicker
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={undefined}
          minimumDate={minDate}
          mode="date"
          onChange={handleNativeChange}
          value={value ? toDate(value) : new Date()}
        />
      ) : null}

      {error ? (
        <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  errorText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  label: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  trigger: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  triggerText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
  },
});
