import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

import Constants from 'expo-constants';

let AppEntryPoint = App;
if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
    console.log('Selecting storybook entrypoint');
    AppEntryPoint = require('./.storybook').default;
}

renderRootComponent(AppEntryPoint);
