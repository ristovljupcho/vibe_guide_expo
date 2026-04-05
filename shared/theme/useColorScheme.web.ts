import { useAppColorScheme } from '@/shared/theme/ColorSchemeProvider';

export function useColorScheme() {
  return useAppColorScheme().colorScheme;
}
