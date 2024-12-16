import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

export default function CrearLocalScreen() {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [zona, setZona] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCrearLocal = async () => {
    // Validaciones específicas para cada campo
    if (
      typeof nombre !== 'string' ||
      nombre.trim() === '' ||
      isNaN(parseInt(capacidad, 10)) ||
      parseInt(capacidad, 10) <= 0 ||
      typeof direccion !== 'string' ||
      direccion.trim() === '' ||
      typeof zona !== 'string' ||
      zona.trim() === ''
    ) {
      console.error(
        'Error: Validaciones fallaron para los datos del formulario.'
      );
      showMessage({
        message: 'Error',
        description: 'Por favor completa correctamente todos los campos.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);

      const duenioId = await AsyncStorage.getItem('userId');
      if (!duenioId) {
        console.error('Error: No se pudo obtener el ID del dueño.');
        showMessage({
          message: 'Error',
          description: 'No se pudo obtener el ID del dueño.',
          type: 'danger',
        });
        return;
      }

      const genericService = new GenericHtppService();
      const localData = {
        nombre,
        capacidad: parseInt(capacidad, 10),
        direccion,
        zona,
        duenioId,
      };

      await genericService.httpPost(Endpoints.LOCALES, localData);

      showMessage({
        message: 'Local creado exitosamente',
        description: 'Tu local ha sido registrado.',
        type: 'success',
      });
      setNombre('');
      setCapacidad('');
      setDireccion('');
      setZona('');
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      showMessage({
        message: 'Error',
        description: 'No se pudieron registrar los datos.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Local</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Capacidad"
        value={capacidad}
        onChangeText={setCapacidad}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TextInput
        style={styles.input}
        placeholder="Zona"
        value={zona}
        onChangeText={setZona}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCrearLocal}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creando...' : 'Crear Local'}
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
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
