import { Stack, useRouter } from 'expo-router';
import { View, Platform, StyleSheet } from 'react-native';
import { Logo } from '../components/Logo';
import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import React from 'react';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/LoginScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: 'yellow',
          headerTitle: '',
          headerLeft: () => (
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          ),
        }}
      ></Stack>
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'black',
    borderBottomWidth: Platform.OS === 'web' ? 2 : 0,
    borderBottomColor: 'yellow',
  },
  logoContainer: {
    marginLeft: Platform.OS === 'web' ? 10 : 10,
    marginTop: Platform.OS === 'web' ? 10 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? 230 : 200, // Ajuste dinámico
  },
});
