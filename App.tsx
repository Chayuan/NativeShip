import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import Constants from 'expo-constants';
import * as Sentry from '@sentry/react-native';

const sentryDsn = 'TO BE REPLACED';

Sentry.init({
    dsn: sentryDsn,
    debug: process.env.NODE_ENV === 'development',
});

let AppEntryPoint = Sentry.wrap(App);

if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
    AppEntryPoint = require('./.storybook').default;
}

renderRootComponent(AppEntryPoint);
