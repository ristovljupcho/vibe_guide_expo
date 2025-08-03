import { Link } from "expo-router";
import { View } from "react-native";
import { homeStyles } from "../../assets/styles/home.styles";
export default function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      <Link href="/place-profile">Go to Place Profile</Link>
    </View>
  );
}
