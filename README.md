# Uber Clone React Native

This project is a clone of the Uber app built using React Native and Expo. It includes features such as user authentication, ride booking, payment processing, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/uber_clone_react_native.git
    cd uber_clone_react_native
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables:
    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    EXPO_PUBLIC_PLACES_API_KEY=your_google_places_api_key
    EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_api_key
    DATABASE_URL=your_database_url
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Usage

- To run the app on an Android device/emulator:
    ```sh
    npm run android
    ```

- To run the app on an iOS device/simulator:
    ```sh
    npm run ios
    ```

- To run the app on the web:
    ```sh
    npm run web
    ```

## Features

- User Authentication (Sign Up, Sign In, OAuth with Google)
- Ride Booking
- Payment Processing with Stripe
- Map Integration with Google Maps
- Driver and Ride Management

## Project Structure

```plaintext
.
├── app/
│   ├── (api)/
│   ├── (auth)/
│   ├── (root)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
│   └── ...
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/
│   ├── CustomButton.tsx
│   ├── DriverCard.tsx
│   ├── GoogleTextInput.tsx
│   ├── InputField.tsx
│   ├── Map.tsx
│   ├── OAuth.tsx
│   └── ...
├── constants/
│   └── index.tsx
├── lib/
│   ├── auth.ts
│   ├── config.ts
│   ├── fetch.ts
│   ├── map.ts
│   └── utils.ts
├── store/
│   └── index.ts
├── types/
│   ├── type.d.ts
│   └── image.d.ts
├── .env
├── .eslintrc.js
├── .gitignore
├── app.json
├── babel.config.js
├── eas.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json