import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/components/auth/AuthProvider';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { detectLocale } from '@/utils/language/i18n';
import { LocalePicker } from '@/components/language/LocalePicker';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        detectLocale();
    }, []);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AnalyticsProvider>
            <AuthProvider>
                <Stack>
                    <Stack.Screen
                        name="(authenticated)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>

                <LocalePicker />
            </AuthProvider>
        </AnalyticsProvider>
    );
}
