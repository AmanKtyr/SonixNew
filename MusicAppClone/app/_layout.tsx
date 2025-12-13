import { Stack } from 'expo-router';
import { AudioProvider } from './(tabs)/AudioProvider';
import { SettingsProvider } from './settingContext';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <AudioProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="player" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
      </AudioProvider>
    </SettingsProvider>
  );
}