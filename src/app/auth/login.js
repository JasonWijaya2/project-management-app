import Ionicons from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../lib/api";
import Toast from "react-native-toast-message";
import { setAccessToken } from "../../lib/auth";

export default function Login() {
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

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      showToast("error", "Missing Fields", "Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });
      await setAccessToken(response.data.accessToken);
      showToast("success", "Login Successful", "Welcome back!");
      router.replace("/(main)");
    } catch (error) {
      setError("Login failed. Please try again.");
      showToast("error", "Login Failed", "Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/auth/register");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-[67px] font-circular-bold w-64 mb-8">
          Glad to meet you again!
        </Text>

        <View className="space-y-4">
          <TextInput
            className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 dark:bg-white/10 rounded-xl text-base text-gray-900 dark:text-white"
            placeholder="Your Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
          />
          <View className="flex-row items-center">
            <TextInput
              className="w-full h-14 mb-8 px-4 bg-gray-50 bg-opacity-10 dark:bg-white/10 rounded-xl text-base text-gray-900 dark:text-white"
              placeholder="Enter your password"
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
          <TouchableOpacity
            className="w-full h-14 bg-emerald-900 rounded-xl items-center justify-center mb-4"
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-[16px]">
                Sign In Now
              </Text>
            )}
          </TouchableOpacity>
          <Text className="text-center text-[14px] text-black dark:text-white font-bold mb-4">
            Or
          </Text>
          <TouchableOpacity
            className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center"
            onPress={handleSignUp}
          >
            <Text className="text-white font-semibold text-[16px]">
              Sign Up Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
