import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!form.fullname || !form.email || !form.password) {
      setError("Please fill in all fields!");
      return;
    }
    setLoading(true);
    setError("");
  };

  const handleLogin = async () => {
    router.push("/auth/login");
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8 font-circular-bold w-64">
          Sign up and starting to work!
        </Text>
        {/* Form Section */}
        <View className="space-y-4">
          <TextInput
            className="w-full h-14 px-4 bg-gray-50 rounded-xl text-base text-gray-900"
            placeholder="Enter Your Full Name"
            placeholderTextColor="#9ca3af"
            value={form.email}
            onChangeText={(text) => handleFormChange("fullname", text)}
          />
          <TextInput
            className="w-full h-14 mb-4 px-4 bg-gray-50 rounded-xl text-base text-gray-900"
            placeholder="Enter Your Email"
            placeholderTextColor="#9ca3af"
            value={form.email}
            onChangeText={(text) => handleFormChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="flex-row items-center">
            <TextInput
              className="w-full h-14 mb-8 px-4 bg-gray-50"
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
        </View>

        {/* Error Section */}
        {error ? (
          <Text className="text-red-500 text-center mb-2">{error}</Text>
        ) : null}

        <Text className="text-center text-gray-700 text-sm mb-4">
          By signing up you agree to our{" "}
          <Text className="font-bold">Term of use</Text> and
          <Text className="font-bold"> Privacy notice</Text>
        </Text>

        {/* Sign In and Sign Up Section */}
        <TouchableOpacity
          className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center mb-4"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-[16px]">
              Sign Up Now
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-center text-gray-800 mt-2">
          Already registered?{" "}
          <Text className="text-amber-400 font-semibold" onPress={handleLogin}>
            Go To Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
