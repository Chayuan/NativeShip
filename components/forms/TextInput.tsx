import { theme } from '@/styles/theme';
import React, { forwardRef, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import CloseIcon from '@/assets/images/icons/close.svg';
import Eye from '@/assets/images/icons/eye.svg';
import EyeSlash from '@/assets/images/icons/eye-slash.svg';

export interface CustomInputProps
    extends Omit<TextInputProps, 'secureTextEntry'> {
    type?: 'password' | 'default';
    label?: string;
    disabled?: boolean;
    withClearIcon?: boolean;
}

export const Input = forwardRef<TextInput, CustomInputProps>(
    ({ type, label, disabled, withClearIcon, ...inputProps }, ref) => {
        const [revealed, setRevealed] = useState<boolean>(false);

        function onPressReveal() {
            setRevealed(!revealed);
        }

        function onPressClear() {
            ref?.current?.clear();
        }

        return (
            <View
                style={[
                    styles.outerContainer,
                    disabled ? styles.outerContainerDisabled : {},
                ]}
                pointerEvents={disabled ? 'none' : 'auto'}
            >
                {label ? <Text style={styles.label}>{label}</Text> : null}
                <View style={styles.container}>
                    <TextInput
                        ref={ref}
                        autoCapitalize="none"
                        {...inputProps}
                        style={[styles.input, inputProps.style]}
                        secureTextEntry={type === 'password' && !revealed}
                    />

                    {type === 'password' && (
                        <TouchableOpacity
                            onPress={onPressReveal}
                            style={styles.revealButton}
                        >
                            {revealed ? (
                                <EyeSlash width={20} height={20} />
                            ) : (
                                <Eye width={18} height={18} />
                            )}
                        </TouchableOpacity>
                    )}

                    {withClearIcon ? (
                        <TouchableOpacity
                            onPress={onPressClear}
                            style={styles.revealButton}
                        >
                            <CloseIcon width={20} height={20} />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    },
);

export const textInputHeight = 60;

const styles = StyleSheet.create({
    outerContainer: {
        gap: 5,
        width: '100%',
    },
    outerContainerDisabled: {
        opacity: 0.2,
    },
    container: {
        width: '100%',
        height: textInputHeight,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: theme.colors.white,
    },
    input: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    revealButton: {
        height: 50,
        width: 50,
        position: 'absolute',
        right: 0,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
