import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { textStyles } from "@/styles/textStyles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    } else if (!formData.repeatPassword) {
      // Only check repeat password if password is valid
      newErrors.repeatPassword = "Please repeat your password";
      isValid = false;
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for the field being edited
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Registration Submitted!");
      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.foregroundContainer}>
        <Text style={[textStyles.headingText, styles.formTitle]}>
          Create your account!
        </Text>

        {/* Form */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              textStyles.buttonText,
              errors.username && styles.inputError,
            ]}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor="#C0C0C0"
            value={formData.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              textStyles.buttonText,
              errors.email && styles.inputError,
            ]}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#C0C0C0"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              textStyles.buttonText,
              errors.password && styles.inputError,
            ]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#C0C0C0"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#C0C0C0"
            />
          </TouchableOpacity>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              textStyles.buttonText,
              errors.repeatPassword && styles.inputError,
            ]}
            placeholder="Repeat Password"
            secureTextEntry={!showRepeatPassword}
            placeholderTextColor="#C0C0C0"
            value={formData.repeatPassword}
            onChangeText={(text) => handleInputChange("repeatPassword", text)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            <Ionicons
              name={showRepeatPassword ? "eye-off" : "eye"}
              size={24}
              color="#C0C0C0"
            />
          </TouchableOpacity>
          {errors.repeatPassword && (
            <Text style={styles.errorText}>{errors.repeatPassword}</Text>
          )}
        </View>

        {/* Form button */}
        <TouchableOpacity
          style={[styles.formButton, isLoading && styles.formButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={[textStyles.buttonText, textStyles.secondaryColor]}>
            {isLoading ? "Submitting..." : "Submit"}
          </Text>
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
  formTitle: {
    color: "#FB654A",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    backgroundColor: "#121212",
    width: "100%",
    height: 55,
    padding: 18,
    borderRadius: 5,
    marginBottom: 14,
    color: "#FAF9F6",
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 14,
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  formButton: {
    backgroundColor: "rgba(251, 101, 74, 0.15)",
    padding: 18,
    borderRadius: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  formButtonDisabled: {
    opacity: 0.6,
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
});
