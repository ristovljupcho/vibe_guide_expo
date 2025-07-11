import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Text } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or splash screen
  }

  return (
    <Stack>
      <Stack.Screen
        name="(main-page)"
        options={{ title: "Main Page", headerShown: false }}
      />
    </Stack>
  );
}
