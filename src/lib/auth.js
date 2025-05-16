import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export const getAccessToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token !== undefined ? token : null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const setAccessToken = async (token) => {
  try {
    if (typeof token === "string") {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      throw new Error("Token must be a string");
    }
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const removeAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
