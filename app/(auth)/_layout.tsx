import { Stack } from "expo-router";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { config } from "../../lib/config"

const Layout = () => {
  return (
    <ClerkProvider publishableKey={config.publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded >
    </ClerkProvider>

  );
};

export default Layout;
