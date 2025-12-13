/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#438bddff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#631010ff',
    tint: tintColorLight,
    icon: '#1b4a6dff',
    tabIconDefault: '#237bbeff',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#8095aaff',
    background: '#151718',
    tint: tintColorDark,
    icon: '#052f52ff',
    tabIconDefault: '#1c9669ff',
    tabIconSelected: tintColorDark,
  },
};
