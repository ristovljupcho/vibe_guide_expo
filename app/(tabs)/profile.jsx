import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <Text>This is the profile</Text>
      <Link href="/account">Go to Account</Link>
    </View>
  );
}
