import { useStorageState } from '@/hooks/useStorageState';
import { useContext, createContext, type PropsWithChildren } from 'react';

export interface SignInParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const AuthContext = createContext<{
    signIn: (params: SignInParams) => Promise<void> | null;
    signOut: () => void;
    register: (params: RegisterParams) => Promise<void> | null;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    register: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useAuth() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useAuth must be wrapped in an <AuthProvider />');
        }
    }

    return value;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    async function signIn(signInParams: SignInParams) {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signInParams.email,
                    password: signInParams.password,
                }),
            },
        );

        if (response.status >= 300) {
            const responseText = await response.text();
            throw new Error(responseText);
        }

        const { accessToken, refreshToken } = await response.json();

        if (!accessToken || !refreshToken) {
            throw new Error('This is not supposed to happen');
        }

        setSession(JSON.stringify({ accessToken, refreshToken }));
    }

    async function register(registerParams: RegisterParams) {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerParams),
            },
        );
        const { accessToken, refreshToken } = await response.json();

        if (response.status >= 300) {
            const responseText = await response.text();
            throw new Error(responseText);
        }

        if (!accessToken || !refreshToken) {
            throw new Error('This is not supposed to happen');
        }

        setSession(JSON.stringify({ accessToken, refreshToken }));
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                register,
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
