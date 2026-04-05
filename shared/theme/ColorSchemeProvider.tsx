import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

type ColorSchemeName = 'light' | 'dark';

type ColorSchemeContextValue = {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(undefined);

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const nativeColorScheme = useNativeColorScheme();
  const [overrideScheme, setOverrideScheme] = useState<ColorSchemeName | null>(null);

  const systemScheme: ColorSchemeName = nativeColorScheme === 'dark' ? 'dark' : 'light';
  const colorScheme = overrideScheme ?? systemScheme;

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        setColorScheme: setOverrideScheme,
        toggleColorScheme: () =>
          setOverrideScheme((current) => (current ?? colorScheme) === 'dark' ? 'light' : 'dark'),
      }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useAppColorScheme() {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error('useAppColorScheme must be used within a ColorSchemeProvider');
  }

  return context;
}
