import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Vehicle List' }}/>
      <Stack.Screen name="create-vehicle" options={{ title: 'Create Vehicle' }} />
    </Stack>
  );
}
