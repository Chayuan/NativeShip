# Welcome to your Expo app, enriched by NativeShip 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


# NativeShip specifics

- Svg as react components 

    svgr is already setup so you can do the following

    ```tsx
    import Eye from '@/assets/images/icons/eye.svg';
        
    export function Component(): ReactNode {
        return (
            <Eye fill={theme.colors.primary} />
        );
    }
    ```

- Storybook support

    `npm run storybook:dev` to start storybook
    You will find example stories in the component folder such as `./components/button/Button.stories.tsx`

- Sentry
    
    Sentry is almost ready to go. 

    You simply need to connect it to your own projects by doing the following

    `cp ./.env.example ./.env.local`
    
    Then, in `.env.local`
    Add your `SENTRY_AUTH_TOKEN` env variable 

    In `./App.tsx`, change the Sentry dsn with yours.

    Finally, in `./app.config.js`, update the sentry `project` and `organisation` values with yours.

- Authentication TODO

    Authentication is ready to go. Just input the API_URL env variable. 
    If you don't use NativeShip server bundle, you may need to update the signIn and register method of the `AuthProvider`.
    To do so, open `./components/auth/AuthProvider.tsx` 

    If you are looking for a ready to go NestJS server with authentication already baked in, Sentry integration, and with some example CRUD, 
    feel free to check _insert api landing url here, for the modique somme of 50000000000$_

- Githug actions TODO

## Learn more about expo

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.


