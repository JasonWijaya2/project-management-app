import * as Font from "expo-font";

export const loadFonts = () => {
  return Font.loadAsync({
    "CircularStd-Black": require("../../assets/fonts/CircularStd-Black.otf"),
    "CircularStd-Bold": require("../../assets/fonts/CircularStd-Bold.otf"),
    "CircularStd-Book": require("../../assets/fonts/CircularStd-Book.otf"),
    "CircularStd-Medium": require("../../assets/fonts/CircularStd-Medium.otf"),
    "CircularStd-Light": require("../../assets/fonts/CircularStd-Light.otf"),
    "CircularStd-BlackItalic": require("../../assets/fonts/CircularStd-BlackItalic.otf"),
    "CircularStd-BoldItalic": require("../../assets/fonts/CircularStd-BoldItalic.otf"),
    "CircularStd-BookItalic": require("../../assets/fonts/CircularStd-BookItalic.otf"),
    "CircularStd-MediumItalic": require("../../assets/fonts/CircularStd-MediumItalic.otf"),
    "CircularStd-LightItalic": require("../../assets/fonts/CircularStd-LightItalic.otf"),
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });
};
