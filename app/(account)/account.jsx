import { useClerk } from "@clerk/clerk-expo";
import { Text } from "@react-navigation/elements";
import { Redirect } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      return <Redirect href={"/(auth)/sign-in"} />;
    } catch (err) {
      console.error("Sign-out error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <Text>This is the account</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
