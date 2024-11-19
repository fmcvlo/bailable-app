import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints'; // Asegúrate de que esté configurado correctamente

export default function RegisterScreen() {
  // Estados para los campos del formulario
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('0'); // Valor inicial para el rol
  const [loading, setLoading] = useState(false); // Estado de carga

  // Funciones de validación
  const validateName = (name) => /^[a-zA-Z\s]{2,50}$/.test(name); // Solo letras y espacios (entre 2 y 50 caracteres)
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Formato de correo electrónico
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // Mínimo 8 caracteres, al menos una letra y un número
  const validateRol = (rol) => /^0|1$/.test(rol); // Solo valores "0" o "1"

  // Validación del formulario completo
  const validateForm = () => {
    if (!validateName(nombre)) {
      Alert.alert('Error', 'El nombre debe tener entre 2 y 50 letras.');
      return false;
    }

    if (!validateName(apellido)) {
      Alert.alert('Error', 'El apellido debe tener entre 2 y 50 letras.');
      return false;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'El email no tiene un formato válido.');
      return false;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.'
      );
      return false;
    }

    if (!validateRol(rol)) {
      Alert.alert('Error', 'El rol debe ser 0 (Usuario) o 1 (Administrador).');
      return false;
    }

    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Datos del formulario
    const payload = {
      name: nombre,
      surname: apellido,
      email: email,
      password: password,
      role: parseInt(rol, 10), // Convertir rol a número
    };

    // Enviar solicitud al backend usando GenericHtppService
    const genericService = new GenericHtppService();
    setLoading(true);

    try {
      const response = await genericService.httpPost(
        Endpoints.REGISTER,
        payload
      );

      if (response.status === 204) {
        Alert.alert('Registro Exitoso', 'Tu cuenta ha sido registrada.');
        router.push('/auth/LoginScreen');
      } else {
        Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      const errorMessage =
        error.response?.data?.message || 'Error desconocido.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      {/* Campo Nombre */}
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese su nombre"
        placeholderTextColor="#aaa"
      />

      {/* Campo Apellido */}
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Ingrese su apellido"
        placeholderTextColor="#aaa"
      />

      {/* Campo Email */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />

      {/* Campo Contraseña */}
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry // Oculta el texto al escribir
      />

      {/* Campo Rol */}
      <Text style={styles.label}>Rol (0: Usuario, 1: Administrador):</Text>
      <TextInput
        style={styles.input}
        value={rol}
        onChangeText={setRol}
        keyboardType="numeric"
        maxLength={1}
        placeholder="0 o 1"
        placeholderTextColor="#aaa"
      />

      {/* Botón de Registrar */}
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#ccc' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
