import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bodyFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type SettingRowProps = {
  label: string;
  description?: string;
  children?: ReactNode;
  danger?: boolean;
};

export function SettingRow({ label, description, children, danger = false }: SettingRowProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.row, { backgroundColor: colors.card }]}>
      <View style={styles.textWrap}>
        <Text style={[styles.label, { color: danger ? colors.destructive : colors.text }]}>{label}</Text>
        {description ? (
          <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  label: {
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textWrap: {
    flex: 1,
  },
});
