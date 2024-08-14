import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import Constants from 'expo-constants';
import * as Sentry from '@sentry/react-native';
import { Mixpanel } from 'mixpanel-react-native';
import { ReactElement } from 'react';

let AppEntryPoint = App;

if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
    AppEntryPoint = require('./.storybook').default;
} else {
    // **** Sentry **** \\
    const sentryDsn = 'TO BE REPLACED';
    Sentry.init({
        dsn: sentryDsn,
        debug: process.env.NODE_ENV === 'development',
    });
    AppEntryPoint = Sentry.wrap(App) as () => ReactElement;

    // **** Mixpanel **** \\
    const trackAutomaticEvents = false;
    const mixpanel = new Mixpanel('YOUR_TOKEN', trackAutomaticEvents);
    mixpanel.init();
}

renderRootComponent(AppEntryPoint);
