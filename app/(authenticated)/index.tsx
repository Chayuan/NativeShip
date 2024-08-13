import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/button/Button';
import { View } from 'react-native';
import * as Sentry from '@sentry/react-native';

export default function Index() {
    const { signOut } = useAuth();
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}
            >
                Sign out
            </Button>
        </View>
    );
}
