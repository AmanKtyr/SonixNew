import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from './translations';

type Theme = 'light' | 'dark';
type Language = 'en' | 'hi';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const deviceTheme = useDeviceColorScheme() ?? 'light';
  const [theme, setThemeState] = useState<Theme>(deviceTheme);
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem('theme')) as Theme | null;
        const savedLanguage = (await AsyncStorage.getItem('language')) as Language | null;

        setThemeState(savedTheme || deviceTheme);
        if (savedLanguage) {
          setLanguageState(savedLanguage);
        }
      } catch (e) {
        console.error('Failed to load settings.', e);
      }
    };

    loadSettings();
  }, [deviceTheme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme.', e);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      await AsyncStorage.setItem('language', newLanguage);
    } catch (e) {
      console.error('Failed to save language.', e);
    }
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language]?.[key] || translations.en[key];
  };

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    t,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};