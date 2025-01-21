import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { config } from "../../lib/config";

const Layout = () => {
    return (
        <ClerkProvider publishableKey={config.publishableKey}>
            <ClerkLoaded>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="find-ride" options={{ headerShown: false }} />
                    <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
                    <Stack.Screen name="book-ride" options={{ headerShown: false }} />
                </Stack>
            </ClerkLoaded>
        </ClerkProvider>
    );
};

export default Layout;
