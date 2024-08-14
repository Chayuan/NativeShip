import { useContext, createContext, type PropsWithChildren } from 'react';
import { Mixpanel } from 'mixpanel-react-native';

const trackAutomaticEvents = false;
const useNative = false;
const mixpanel = new Mixpanel(
    process.env.EXPO_PUBLIC_MIXPANEL_TOKEN ?? '',
    trackAutomaticEvents,
    useNative,
);
mixpanel.init();

const AnalyticsContext = createContext<{
    mixpanel: Mixpanel;
}>({
    mixpanel,
});

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

export function AnalyticsProvider({ children }: PropsWithChildren) {
    return (
        <AnalyticsContext.Provider
            value={{
                mixpanel,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}
