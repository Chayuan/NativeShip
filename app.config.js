module.exports = {
    name: 'NativeShip',
    slug: 'NativeShip',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    plugins: [
        [
            '@sentry/react-native/expo',
            {
                url: 'https://sentry.io/',
                project: 'YOUR_SENTRY_PROJECT',
                organization: 'TO_BE_REPLACED',
            },
        ],
    ],
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
    },
    web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        storybookEnabled: process.env.STORYBOOK_ENABLED,
    },
};
