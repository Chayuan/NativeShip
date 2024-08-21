import {
    useContext,
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = false;
const useNative = false;
const mixpanel = new Mixpanel(
    process.env.EXPO_PUBLIC_MIXPANEL_TOKEN ?? '',
    trackAutomaticEvents,
    useNative,
);

interface AnalyticsContextInterface {
    track: (eventName: string, params?: Record<string, string>) => void;
    identify: (distinctId: string) => void;
    reset: () => void;
    setProperty: (propertyKey: string, propertyValue: string | number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextInterface>({
    track: () => null,
    identify: () => null,
    reset: () => null,
    setProperty: () => null,
});

export function AnalyticsProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        mixpanel.init();
    }, []);

    function track(eventName: string, params?: Record<string, string>) {
        mixpanel.track(eventName, params);
    }

    function identify(distinctId: string) {
        mixpanel.identify(distinctId);
    }

    function reset() {
        mixpanel.reset();
    }

    function setProperty(propertyKey: string, propertyValue: string | number) {
        mixpanel.getPeople().set(propertyKey, propertyValue);
    }

    return (
        <AnalyticsContext.Provider
            value={{
                track,
                identify,
                reset,
                setProperty,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalytics() {
    const value = useContext(AnalyticsContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error(
                'useAnalytics must be wrapped in an <AnalyticsProvider />',
            );
        }
    }

    return value;
}
