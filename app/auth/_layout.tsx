import { Stack } from 'expo-router';

export default function authLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
  );
}
