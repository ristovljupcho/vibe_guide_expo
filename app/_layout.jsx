import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Text } from "react-native";
import "../global.css";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    Lato_100Thin_Italic,
    Lato_300Light_Italic,
    Lato_400Regular_Italic,
    Lato_700Bold_Italic,
    Lato_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or splash screen
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
