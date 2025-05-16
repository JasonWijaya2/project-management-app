import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./theme-provider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <View className="flex-row space-x-2 p-4">
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "light" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onPress={() => setTheme("light")}
      >
        <Text
          className={
            theme === "light"
              ? "text-white"
              : "text-gray-800 dark:text-gray-200"
          }
        >
          Light
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "dark" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onPress={() => setTheme("dark")}
      >
        <Text
          className={
            theme === "dark" ? "text-white" : "text-gray-800 dark:text-gray-200"
          }
        >
          Dark
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "system" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onPress={() => setTheme("system")}
      >
        <Text
          className={
            theme === "system"
              ? "text-white"
              : "text-gray-800 dark:text-gray-200"
          }
        >
          System
        </Text>
      </TouchableOpacity>
    </View>
  );
};
