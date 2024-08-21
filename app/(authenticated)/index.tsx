import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/button/Button';
import { View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';
import { useI18n } from '@/utils/language/i18n';

export default function Index() {
    const i18n = useI18n();
    const { signOut } = useAuth();
    const { track } = useAnalytics();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
            }}
        >
            <Button
                onPress={() => {
                    Sentry.captureException(new Error('First error'));
                }}
            >
                Test sentry
            </Button>

            <Button
                onPress={() => {
                    track('button_press');
                }}
            >
                Test mixpanel
            </Button>
            <Button
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}
            >
                {i18n.t('auth.logoutButton')}
            </Button>
        </View>
    );
}
