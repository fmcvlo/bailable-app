import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default function RegisterScreen() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('0'); // Valor inicial para el rol

  // Validación del campo "rol"
  const handleRolChange = (text) => {
    if (text === '1' || text === '0' || text === '') {
      setRol(text);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = () => {
    if (!nombre || !apellido || !email || !password || !rol) {
      Alert.alert('Registro Incompleto', 'Todos los campos son obligatorios.');
      return;
    }

    if (rol !== '1' && rol !== '0') {
      Alert.alert(
        'Error en Rol',
        'El rol debe ser 0 (Usuario) o 1 (Administrador).'
      );
      return;
    }

    Alert.alert(
      'Registro Exitoso',
      `¡Bienvenido, ${nombre} ${apellido}!\nTu cuenta ha sido registrada con éxito.\nEmail: ${email}\nRol: ${
        rol === '1' ? 'Administrador' : 'Usuario'
      }`
    );
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
        onChangeText={handleRolChange}
        keyboardType="numeric"
        maxLength={1}
        placeholder="0 o 1"
        placeholderTextColor="#aaa"
      />

      {/* Botón de Registrar */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
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
