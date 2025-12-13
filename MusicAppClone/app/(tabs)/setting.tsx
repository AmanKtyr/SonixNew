import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../settingContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, setTheme, language, setLanguage, t } = useSettings();

  const isDark = theme === 'dark';

  const styles = useMemo(() => dynamicStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>{'<'} {t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings_title')}</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        {/* Theme Setting */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{t('darkMode')}</Text>
          <Switch
            value={isDark}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
            trackColor={{ false: '#767577', true: '#1db954' }}
            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        {/* Language Setting */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{t('language')}</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity style={[styles.langButton, language === 'en' && styles.langButtonActive]} onPress={() => setLanguage('en')}><Text style={[styles.langButtonText, language === 'en' && styles.langButtonActiveText]}>EN</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.langButton, language === 'hi' && styles.langButtonActive]} onPress={() => setLanguage('hi')}><Text style={[styles.langButtonText, language === 'hi' && styles.langButtonActiveText]}>HI</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = (theme: 'light' | 'dark') => {
	const isDarkMode = theme === 'dark';
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: isDarkMode ? '#181818' : '#fff',
			paddingTop: 50,
		},
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 10,
			marginBottom: 20,
		},
		backButton: {
			color: '#1db954',
			fontSize: 24,
			paddingHorizontal: 10,
		},
		title: {
			fontSize: 22,
			fontWeight: 'bold',
			color: isDarkMode ? '#fff' : '#000',
		},
		content: {
			flex: 1,
			paddingHorizontal: 20,
		},
		settingRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingVertical: 15,
			borderBottomWidth: 1,
			borderBottomColor: isDarkMode ? '#333' : '#eee',
		},
		settingLabel: {
			color: isDarkMode ? '#fff' : '#000',
			fontSize: 16,
		},
		languageButtons: {
			flexDirection: 'row',
		},
		langButton: {
			paddingVertical: 5,
			paddingHorizontal: 15,
			borderRadius: 20,
			backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
			marginLeft: 10,
		},
		langButtonActive: {
			backgroundColor: '#1db954',
		},
		langButtonText: {
			color: isDarkMode ? '#fff' : '#000',
			fontWeight: 'bold',
		},
		langButtonActiveText: {
			color: '#fff',
		},
		placeholderText: {
			// This can be removed if not used
			color: isDarkMode ? '#bbb' : '#555',
			fontSize: 16,
		},
	});
};