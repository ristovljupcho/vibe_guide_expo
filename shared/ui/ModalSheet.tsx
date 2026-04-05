import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type ModalSheetProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export function ModalSheet({ visible, title, onClose, children, footer }: ModalSheetProps) {
  const { colors } = useAppTheme();

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Pressable onPress={onClose} style={styles.overlay}>
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={[styles.sheet, { backgroundColor: colors.card }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 },
              ]}>
              <Text style={[styles.closeText, { color: colors.text }]}>X</Text>
            </Pressable>
          </View>
          <View style={styles.content}>{children}</View>
          {footer ? <View style={[styles.footer, { borderTopColor: colors.border }]}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  closeText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    maxHeight: 460,
    padding: 16,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  title: {
    fontFamily: displayFontFamily,
    fontSize: 20,
    fontWeight: '600',
  },
});
