import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getAccessToken } from "../lib/auth";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken();
      setToken(token);
      setLoading(false);
    };

    getToken();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#0C5357" />
      </View>
    );
  }

  return <Redirect href={token ? "/(main)" : "/auth/login"} />;
}
