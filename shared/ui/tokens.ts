import { Platform } from 'react-native';

export const displayFontFamily = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: 'System',
});

export const bodyFontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const screenPadding = 16;

export const surfaceShadow = Platform.select({
  ios: {
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  android: {
    elevation: 4,
  },
  default: {},
});
