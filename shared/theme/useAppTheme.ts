import { Colors } from '@/shared/theme/colors';
import { useColorScheme } from '@/shared/theme/useColorScheme';

export function useAppTheme() {
  const colorScheme = useColorScheme() ?? 'light';

  return {
    colorScheme,
    colors: Colors[colorScheme],
  };
}
