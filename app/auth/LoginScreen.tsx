import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  // Manejar cambio de texto
  const handleTextChange = (field, text: string) => {
    setAuthData({ ...authData, [field]: text });

    if (field === 'email') {
      setEmail(text);
    } else if (field === 'password') {
      setPassword(text);
    }
  };

  // Manejar login
  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log(authData);
      const genericHtppService = new GenericHtppService(); // Crear una instancia del servicio
      const response = await genericHtppService.httpPost(Endpoints.AUTH_LOGIN, {
        email: authData.email,
        password: authData.password,
      }); // Llamar al método login

      if (response.status === 200 && response.data.userId) {
        console.log('Inicio de sesión exitoso:', response.data);

        // Almacenar los datos del usuario
        await AsyncStorage.setItem('userId', response.data.userId);
        console.log('userId guardado en AsyncStorage:', response.data.userId);

        // Redirigir a la pantalla principal
        router.push('/HomeScreen');
      } else {
        console.error('Error al iniciar sesión:', response.error);
        Alert.alert('Error', 'Credenciales inválidas.');
      }
    } catch (error) {
      console.error('Error en el proceso de inicio de sesión:', error);
      Alert.alert('Error', 'Algo salió mal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => handleTextChange('email', text)} // Usamos la función para el campo username
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => handleTextChange('password', text)} // Usamos la función para el campo password
      />
      <Button
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity onPress={() => router.push('auth/RegisterScreen')}>
        <Text style={styles.registerLink}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4 },
  registerLink: {
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
