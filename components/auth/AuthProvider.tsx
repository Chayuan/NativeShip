import { useStorageState } from '@/hooks/useStorageState';
import { useContext, createContext, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    register: () => void;
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

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setSession('xxx');
                },
                register: () => {
                    // Perform registration logic here
                    setSession('xxx');
                },
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
