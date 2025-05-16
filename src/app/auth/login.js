import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields!");
      return;
    }
    setLoading(true);
    setError("");
    router.replace("/(main)");
  };

  const handleSignUp = async () => {
    router.push("/auth/register");
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* Form Section */}
      <View className="flex-row items-center w-full px-4">
        <TextInput
          className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
          placeholder="Enter Your Email"
          placeholderTextColor="#9ca3af"
          value={form.email}
          onChangeText={(text) => handleFormChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="flex-row items-center w-full px-4">
        <TextInput
          className="flex-1 h-14 mb-8 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
          placeholder="Enter Your Password"
          placeholderTextColor="#9ca3af"
          value={form.password}
          onChangeText={(text) => handleFormChange("password", text)}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-8 bottom-1/2"
        >
          {showPassword ? (
            <Ionicons name="eye-off" size={24} color="#9ca3af" />
          ) : (
            <Ionicons name="eye" size={24} color="#9ca3af" />
          )}
        </TouchableOpacity>
      </View>

      {/* Error Section */}
      {error ? (
        <Text className="text-red-500 text-center mb-2">{error}</Text>
      ) : null}

      {/* Sign In and Sign Up Section */}
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
      <Text className="text-center text-[14px] text-black font-bold mb-4">
        Or
      </Text>

      <TouchableOpacity
        className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center"
        onPress={handleSignUp}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-[16px]">
            Sign Up Now
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
