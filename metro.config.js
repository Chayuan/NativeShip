const path = require('path');
const { generate } = require('@storybook/react-native/scripts/generate');
const {
    getSentryExpoConfig
} = require("@sentry/react-native/metro");

generate({
    configPath: path.resolve(__dirname, './.storybook'),
});

module.exports = (() => {
    const config = getSentryExpoConfig(__dirname);

    const { transformer, resolver } = config;

    config.transformer.unstable_allowRequireContext = true;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [
            ...resolver.sourceExts,
            // svgr specific
            'svg',
            // storybook specific
            'mjs',
        ],
        resolveRequest: (context, moduleName, platform) => {
            const defaultResolveResult = context.resolveRequest(
                context,
                moduleName,
                platform,
            );

            if (
                process.env.STORYBOOK_ENABLED !== 'true' &&
                defaultResolveResult?.filePath?.includes?.('.storybook/')
            ) {
                return {
                    type: 'empty',
                };
            }

            return defaultResolveResult;
        },
    };

    return config;
})();