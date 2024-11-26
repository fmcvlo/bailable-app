import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const genericService = new GenericHtppService();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await genericService.httpPost(Endpoints.AUTH_LOGIN, {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data.userId) {
        console.log('Inicio de sesión exitoso:', response.data);

        // Guardar el token o datos del usuario en AsyncStorage
        await AsyncStorage.setItem('userId', response.data.userId);

        // Redirigir al home
        router.replace('/HomeScreen');
      } else {
        console.error('Error al iniciar sesión:', response.data);
        setError('Credenciales inválidas. Inténtalo de nuevo.');
      }
    } catch (err: any) {
      console.error('Error en el proceso de inicio de sesión:', err);
      setError(
        err.response?.data?.message || 'Error desconocido al iniciar sesión.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      )}
      <Text
        style={styles.registerLink}
        onPress={() => router.push('/auth/RegisterScreen')}
      >
        ¿No tienes cuenta? Regístrate aquí
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 16,
    textAlign: 'center',
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
