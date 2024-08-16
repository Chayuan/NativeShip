import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/forms/TextInput';
import { useI18n } from '@/utils/language/i18n';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function SignIn() {
    const i18n = useI18n();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 30,
            }}
        >
            <Input
                onChangeText={setEmail}
                withClearIcon
                ref={emailInputRef}
                onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                }}
            />

            <Input
                ref={passwordInputRef}
                type="password"
                onChangeText={setPassword}
                onSubmitEditing={() => {
                    signIn();
                }}
            />

            <Button
                onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                }}
            >
                {i18n.t('auth.signInButton')}
            </Button>

            <Text style={{ marginTop: 50 }}>
                {i18n.t('auth.noAccount')}{' '}
                <Text
                    onPress={() => router.replace('/register')}
                    style={{ fontWeight: 'bold' }}
                >
                    {i18n.t('auth.registerButton')}
                </Text>
            </Text>
        </View>
    );
}
