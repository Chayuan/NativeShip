import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/forms/TextInput';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function Register() {
    const { register } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const firstNameInputRef = useRef<TextInput>(null);
    const lastNameInputRef = useRef<TextInput>(null);
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
                onChangeText={setFirstName}
                withClearIcon
                ref={firstNameInputRef}
                label="First Name"
                onSubmitEditing={() => {
                    lastNameInputRef.current?.focus();
                }}
            />

            <Input
                label="Last Name"
                onChangeText={setLastName}
                withClearIcon
                ref={lastNameInputRef}
                onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                }}
            />

            <Input
                label="Email"
                onChangeText={setEmail}
                withClearIcon
                ref={emailInputRef}
                onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                }}
            />

            <Input
                withClearIcon
                label="Password"
                ref={passwordInputRef}
                type="password"
                onChangeText={setPassword}
                onSubmitEditing={() => {
                    register();
                }}
            />

            <Button
                onPress={() => {
                    register();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                }}
            >
                Register
            </Button>

            <Text style={{ marginTop: 50 }}>
                Already have an account?{' '}
                <Text
                    onPress={() => router.replace('/sign-in')}
                    style={{ fontWeight: 'bold' }}
                >
                    Sign in
                </Text>
            </Text>
        </View>
    );
}
