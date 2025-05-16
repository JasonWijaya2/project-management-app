import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import api from "../../lib/api";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      showToast("error", "Missing Fields", "Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/register", {
        name: fullName,
        email,
        password,
      });
      showToast("success", "Registration Successful", "You can now log in.");
      router.replace("/auth/login");
    } catch (e) {
      setError("Registration failed. Please try again.");
      showToast("error", "Registration Failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.replace("/auth/login");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-circular-bold w-64">
            Sign up and starting to work!
          </Text>
          <View className="space-y-4">
            <TextInput
              className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 dark:bg-white/10 rounded-xl text-base text-gray-900 dark:text-white"
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 dark:bg-white/10 rounded-xl text-base text-gray-900 dark:text-white"
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View className="flex-row items-center">
              <TextInput
                className="w-full h-14 mb-8 px-4 bg-gray-50 bg-opacity-10 dark:bg-white/10 rounded-xl text-base text-gray-900 dark:text-white"
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-1/2"
              >
                {showPassword ? (
                  <Ionicons name="eye-off" size={24} color="#9ca3af" />
                ) : (
                  <Ionicons name="eye" size={24} color="#9ca3af" />
                )}
              </TouchableOpacity>
            </View>
            {error ? (
              <Text className="text-red-500 text-center mb-2">{error}</Text>
            ) : null}
            <Text className="text-center text-gray-700 dark:text-gray-300 text-sm mb-4">
              By signing up you agree to our{" "}
              <Text className="font-bold">Term of use</Text> and
              <Text className="font-bold"> privacy notice</Text>
            </Text>
            <TouchableOpacity
              className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center mb-4 mt-20"
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-[16px]">
                {loading ? "Registering..." : "Sign Up Now"}
              </Text>
            </TouchableOpacity>

            <Text className="text-center text-gray-800 dark:text-gray-200 mt-2">
              Already registered?{" "}
              <Text
                className="text-amber-400 font-semibold"
                onPress={handleGoToLogin}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
