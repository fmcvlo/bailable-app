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

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [authData, setAuthData] = useState({
    password: '',
    username: '',
  });

  // Validar credenciales
  const validateCredentials = (email: string, password: string) => {
    if (email === 'admin' && password === '1234') {
      return { id: '1', type: 'admin', route: '/admin' };
    } else if (email === 'user' && password === '1234') {
      return { id: '2', type: 'user', route: '/HomeScreen' };
    } else {
      return null;
    }
  };

  // Manejar cambio de texto
  const handleTextChange = (field, text: string) => {
    setAuthData({ ...authData, [field]: text });

    if (field === 'username') {
      setUsername(text);
    } else if (field === 'password') {
      setPassword(text);
    }
  };

  // Manejar login
  const handleLogin = async () => {
    console.log('Auth data: ', authData);

    setLoading(true);
    try {
      const user = validateCredentials(authData.username, authData.password);

      if (user) {
        console.log('Usuario autenticado:', user);
        router.push(user.route); // Redirige a la ruta correspondiente
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
      }
    } catch (error) {
      console.error(error);
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
        placeholder="Usuario"
        value={username}
        onChangeText={(text: string) => handleTextChange('username', text)} // Usamos la función para el campo username
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
      {/* Enlace a RegisterScreen */}
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
