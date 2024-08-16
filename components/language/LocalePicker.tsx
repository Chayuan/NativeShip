import { theme } from '@/styles/theme';
import { changeLocale, useI18n } from '@/utils/language/i18n';
import { ReactNode, useEffect, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
export function LocalePicker(): ReactNode {
    const i18n = useI18n();

    const [isOpened, setIsOpened] = useState(false);
    const pickerOpacity = useSharedValue(0);

    const animatedStyles = useAnimatedStyle<ViewStyle>(
        () => ({
            opacity: pickerOpacity.value,
        }),
        [pickerOpacity],
    );

    useEffect(() => {
        i18n.onChange(() => {
            setSelectedLocale(i18n.locale);
        });
    }, []);

    const [selectedLocale, setSelectedLocale] = useState<string>(i18n.locale);

    function onPressOpenLocalePicker() {
        setIsOpened(true);
        pickerOpacity.value = withTiming(1, { duration: 200 });
    }

    function onPressLocale(locale: string) {
        if (locale !== selectedLocale) {
            changeLocale(locale);
        }

        close();
    }

    function close() {
        setIsOpened(false);
        pickerOpacity.value = withTiming(0, { duration: 200 });
    }

    return (
        <>
            <Pressable
                style={styles.outsideContainer}
                onPress={close}
                pointerEvents={isOpened ? 'auto' : 'none'}
            />
            <TouchableOpacity
                style={styles.mainButton}
                onPress={onPressOpenLocalePicker}
            >
                <Text>{selectedLocale}</Text>
            </TouchableOpacity>

            <Animated.View
                style={[styles.picker, animatedStyles]}
                pointerEvents={isOpened ? 'auto' : 'none'}
            >
                <TouchableOpacity
                    style={styles.localeButton}
                    onPress={() => onPressLocale('en-US')}
                >
                    <Text
                        style={
                            selectedLocale === 'en-US'
                                ? styles.textSelected
                                : undefined
                        }
                    >
                        en-US
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.localeButton}
                    onPress={() => onPressLocale('fr-FR')}
                >
                    <Text>fr-FR</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    outsideContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    mainButton: {
        position: 'absolute',
        top: 50,
        right: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: theme.colors.white,
    },
    localeButton: {
        padding: 25,
        paddingVertical: 10,
        borderRadius: 5,
    },
    picker: {
        position: 'absolute',
        top: 50,
        right: 15,
        borderRadius: 5,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: theme.colors.white,
    },
    textSelected: {
        fontWeight: 'bold',
    },
});
