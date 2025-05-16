import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { loadFonts } from "../lib/font";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { ThemeProvider } from "../components/theme-provider";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} edges={["bottom", "top"]}>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarBackgroundColor: "#ffffff",
                statusBarStyle: "dark",
                contentStyle: {
                  backgroundColor: "#F2F2F2",
                },
              }}
            >
              <StatusBar style="dark" />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
      <Toast />
    </View>
  );
}
