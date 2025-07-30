import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { textStyles } from "@/styles/textStyles";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.foregroundContainer}>
        <Text style={[textStyles.headingText, styles.title]}>
          Create your account!
        </Text>
        <TextInput
          style={[styles.input, textStyles.buttonText]}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#C0C0C0"
        />

        <TextInput
          style={[styles.input, textStyles.buttonText]}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#C0C0C0"
        />
        <TextInput
          style={[styles.input, textStyles.buttonText]}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#C0C0C0"
        />
        <TextInput
          style={[styles.input, textStyles.buttonText]}
          placeholder="Repeat Password"
          secureTextEntry
          placeholderTextColor="#C0C0C0"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Registration Submitted!")}
        >
          <Text style={textStyles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Login redirect */}
        <View style={styles.loginRedirectContainer}>
          <Text style={[textStyles.bodyText, textStyles.secondaryColor]}>
            Have an account?
          </Text>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.textButton}>
              <Text
                style={[
                  textStyles.headingText,
                  textStyles.boldText,
                  textStyles.secondaryColor,
                ]}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 80,
  },
  foregroundContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderRadius: 20,
  },
  title: {
    color: "#FB654A",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#121212",
    width: "100%",
    height: 55,
    padding: 18,
    borderRadius: 5,
    marginBottom: 14,
    color: "#FAF9F6", // Set input text color to white
  },
  button: {
    backgroundColor: "rgba(251, 101, 74, 0.15)",
    padding: 18,
    borderRadius: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  textButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginRedirectContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    marginBottom: 10,
  },
});
