import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/forms/TextInput';
import { useI18n } from '@/utils/language/i18n';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function Register() {
    const i18n = useI18n();
    const { register } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const firstNameInputRef = useRef<TextInput>(null);
    const lastNameInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    async function registerAndRedirect() {
        await register({
            firstName,
            lastName,
            email,
            password,
        });
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
                label={i18n.t('auth.firstName')}
                onChangeText={setFirstName}
                withClearIcon
                ref={firstNameInputRef}
                onSubmitEditing={() => {
                    lastNameInputRef.current?.focus();
                }}
            />

            <Input
                label={i18n.t('auth.lastName')}
                onChangeText={setLastName}
                withClearIcon
                ref={lastNameInputRef}
                onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                }}
            />

            <Input
                label={i18n.t('auth.email')}
                onChangeText={setEmail}
                withClearIcon
                ref={emailInputRef}
                onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                }}
            />

            <Input
                label={i18n.t('auth.password')}
                withClearIcon
                ref={passwordInputRef}
                type="password"
                onChangeText={setPassword}
                onSubmitEditing={registerAndRedirect}
            />

            <Button onPress={registerAndRedirect}>
                {i18n.t('auth.registerButton')}
            </Button>

            <Text style={{ marginTop: 50 }}>
                {i18n.t('auth.alreadyHaveAccount')}{' '}
                <Text
                    onPress={() => router.replace('/sign-in')}
                    style={{ fontWeight: 'bold' }}
                >
                    {i18n.t('auth.signInButton')}
                </Text>
            </Text>
        </View>
    );
}
