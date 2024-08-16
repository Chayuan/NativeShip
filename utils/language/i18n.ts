import { I18n } from 'i18n-js';
import { fr, en } from './translations';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { Platform } from 'react-native';

const i18n = new I18n({
    'en-US': en,
    'fr-FR': fr,
});
i18n.enableFallback = true;
i18n.defaultLocale = 'en-US';

export async function detectLocale(): Promise<void> {
    const deviceLocales = getLocales();

    const currentLocale = await AsyncStorage.getItem('locale');

    if (!currentLocale || currentLocale.length === 0) {
        i18n.locale = deviceLocales[0].languageTag ?? '';

        await AsyncStorage.setItem(
            'locale',
            deviceLocales[0].languageTag ?? '',
        );
    } else {
        i18n.locale = currentLocale;
    }
}

export async function changeLocale(locale: string): Promise<void> {
    i18n.locale = locale;

    await AsyncStorage.setItem('locale', locale);

    if (Platform.OS === 'web') {
        window.location.reload();
    } else {
        await Updates.reloadAsync();
    }
}

export function useI18n(): I18n {
    return i18n;
}
