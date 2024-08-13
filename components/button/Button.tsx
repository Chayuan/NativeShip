import { theme } from '@/styles/theme';
import { PropsWithChildren, ReactNode } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ButtonProps extends PropsWithChildren {
    onPress: () => void;
}

export function Button({ onPress, children }: ButtonProps): ReactNode {
    return (
        <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchableOpacity: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    text: {
        color: theme.colors.white,
    },
});
