import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import { showMessage } from 'react-native-flash-message';

export default function RegisterScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('0');
  const [loading, setLoading] = useState(false);

  const validateName = (name) => /^[a-zA-Z\s]{2,50}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/.test(password);

  const validateRol = (rol) => /^0|1$/.test(rol);

  const validateForm = () => {
    if (!validateName(nombre)) {
      showMessage({
        message: 'Error',
        description: 'El nombre debe tener entre 2 y 50 letras.',
        type: 'danger',
      });
      return false;
    }

    if (!validateName(apellido)) {
      showMessage({
        message: 'Error',
        description: 'El apellido debe tener entre 2 y 50 letras.',
        type: 'danger',
      });
      return false;
    }

    if (!validateEmail(email)) {
      showMessage({
        message: 'Error',
        description: 'El email no tiene un formato válido.',
        type: 'danger',
      });
      return false;
    }

    if (!validatePassword(password)) {
      showMessage({
        message: 'Error',
        description:
          'La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.',
        type: 'danger',
      });
      return false;
    }

    if (!validateRol(rol)) {
      showMessage({
        message: 'Error',
        description: 'El rol debe ser 0 (Usuario) o 1 (Administrador).',
        type: 'danger',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      name: nombre,
      surname: apellido,
      email: email,
      password: password,
      role: parseInt(rol, 10),
    };

    const genericService = new GenericHtppService();
    setLoading(true);

    try {
      const response = await genericService.httpPost(
        Endpoints.REGISTER,
        payload
      );

      if (response.status === 204) {
        showMessage({
          message: 'Registro Exitoso',
          description: 'Tu cuenta ha sido registrada.',
          type: 'success',
        });
        router.push('/auth/LoginScreen');
      } else {
        showMessage({
          message: 'Error',
          description: 'Hubo un problema al registrar el usuario.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      const errorMessage =
        error.response?.data?.message || 'Error desconocido.';
      showMessage({
        message: 'Error',
        description: errorMessage,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese su nombre"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Ingrese su apellido"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
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
