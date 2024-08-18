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

    const [email, setEmail] = useState('johnsmith@user.io');
    const [password, setPassword] = useState('test');

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    async function signInAndRedirect() {
        try {
            await signIn({
                email,
                password,
            });
        } catch (err: any) {
            console.log(err);
        }

        router.replace('/');
    }

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
                defaultValue={email}
            />

            <Input
                ref={passwordInputRef}
                type="password"
                onChangeText={setPassword}
                onSubmitEditing={signInAndRedirect}
                defaultValue={password}
            />

            <Button onPress={signInAndRedirect}>
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
