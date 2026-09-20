# ReqRes React Native App

Expo app for the React Native API Integration task. It talks to [ReqRes](https://reqres.in) for login, register, user profile, and paginated products.

## Setup

1. Install Node.js, then install **Expo Go** on your phone (SDK 57).
2. In this folder:

```bash
npm install
```

3. Copy `.env.example` to `.env` and add the ReqRes API key:

```
EXPO_PUBLIC_API_BASE_URL=https://reqres.in
EXPO_PUBLIC_API_KEY=your_reqres_api_key
```

4. Start the app:

```bash
npx expo start
```

5. Scan the QR code with Expo Go (Android) or the Camera app (iPhone).

If the phone cannot reach your PC on Wi-Fi:

```bash
npx expo start --tunnel
```

Restart Expo after changing `.env`.

## Test accounts

| Action   | Email                | Password   |
|----------|----------------------|------------|
| Login    | eve.holt@reqres.in   | cityslicka |
| Register | eve.holt@reqres.in   | pistol     |

ReqRes only accepts its defined users for a successful login or register.

## Deliverables

1. Complete React Native source code (this repo)
2. All 5 screens: Login, Register, Home, Profile, Products
3. API service layer (`src/api`)
4. Navigation: auth stack + bottom tabs (Home, Products, Profile, Logout)
5. Form validation (`src/utils/validation.js`)
6. Error handling with retry, loading states, and an error boundary
7. This README

## What the app does

- Login and Register with email/password validation
- Token saved in AsyncStorage
- `x-api-key` header on every request
- Profile: avatar, name, email, user ID
- Products: page 1 first, **Load more** for page 2, pull-to-refresh
- Buttons disabled while a request is in flight
- Logout in the bottom bar and on the Profile page

## Project structure

```
src/
├── api/           apiClient, authApi, userApi, productApi
├── screens/       Login, Register, Home, Profile, Products
├── components/    Button, Input, Loader, ProductCard, TabBar
├── navigation/    Auth stack and tab navigator
├── constants/     API URLs and theme
├── utils/         Form validation
├── storage/       Token persistence
└── context/       Auth state
```
