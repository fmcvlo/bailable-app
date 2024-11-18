import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Logo } from '../components/Logo';
import { useEffect } from 'react';

export default function Layout() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/auth/LoginScreen');
  }, []);

  return (
    <View className="flex-1 bg-black">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'yellow',
          headerTitle: '',
          headerLeft: () => <Logo />,
        }}
      ></Stack>
    </View>
  );
}
