import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GenericHtppService } from '../../services/genericHtppService';
import Endpoints from '../../../helpers/endpoints';
import { showMessage } from 'react-native-flash-message';

export default function LocalDetailScreen() {
  const { localId } = useLocalSearchParams();

  const [localData, setLocalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    servicios: [{ nombre: '', descripcion: '', precio: '' }],
    imgSource: '',
  });

  // Fetch local details
  const fetchLocalDetails = async () => {
    try {
      const genericService = new GenericHtppService();
      const response = await genericService.httpGet(
        `${Endpoints.LOCALES}/${localId}`
      );
      setLocalData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching local details:', err);
      setError('No se pudieron cargar los detalles del local.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalDetails();
  }, [localId]);

  // Create a new event
  const handleCreateEvent = async () => {
    const { nombre, descripcion, fecha, servicios, imgSource } = newEvent;

    if (
      !nombre ||
      !descripcion ||
      !fecha ||
      !imgSource ||
      servicios.length === 0
    ) {
      showMessage({
        message: 'Error',
        description: 'Completa todos los campos.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      const genericService = new GenericHtppService();
      const eventData = {
        nombre,
        descripcion,
        fecha,
        servicios,
        imgSource,
        localId,
      };

      await genericService.httpPost(Endpoints.EVENTOS, eventData);

      Alert.alert('Éxito', 'El evento fue creado exitosamente.');
      setLocalData((prev) => ({
        ...prev,
        eventos: [...(prev.eventos || []), eventData],
      }));
      setNewEvent({
        nombre: '',
        descripcion: '',
        fecha: '',
        servicios: [{ nombre: '', descripcion: '', precio: '' }],
        imgSource: '',
      });
    } catch (err) {
      console.error('Error creating event:', err);
      Alert.alert('Error', 'No se pudo crear el evento.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text>Cargando detalles del local...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local: {localData?.nombre}</Text>
      <Text style={styles.info}>Dirección: {localData?.direccion}</Text>
      <Text style={styles.info}>
        Capacidad: {localData?.capacidad || 'N/A'}
      </Text>
      <Text style={styles.info}>Zona: {localData?.zona || 'N/A'}</Text>

      <Text style={styles.subtitle}>Crear Evento</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
        <TextInput
          style={styles.input}
          placeholder="Nombre del Evento"
          value={newEvent.nombre}
          onChangeText={(text) => setNewEvent({ ...newEvent, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={newEvent.descripcion}
          onChangeText={(text) =>
            setNewEvent({ ...newEvent, descripcion: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha (YYYY-MM-DD)"
          value={newEvent.fecha}
          onChangeText={(text) => setNewEvent({ ...newEvent, fecha: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Imagen (URL)"
          value={newEvent.imgSource}
          onChangeText={(text) => setNewEvent({ ...newEvent, imgSource: text })}
        />

        <Text style={styles.subtitle}>Servicios</Text>
        <ScrollView
          style={styles.serviceScroll}
          contentContainerStyle={styles.serviceScrollContent}
          nestedScrollEnabled
        >
          {newEvent.servicios.map((servicio, index) => (
            <View key={index} style={styles.servicioContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del Servicio"
                value={servicio.nombre}
                onChangeText={(text) => {
                  const updatedServicios = [...newEvent.servicios];
                  updatedServicios[index].nombre = text;
                  setNewEvent({ ...newEvent, servicios: updatedServicios });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción del Servicio"
                value={servicio.descripcion}
                onChangeText={(text) => {
                  const updatedServicios = [...newEvent.servicios];
                  updatedServicios[index].descripcion = text;
                  setNewEvent({ ...newEvent, servicios: updatedServicios });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio del Servicio"
                value={servicio.precio}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const updatedServicios = [...newEvent.servicios];
                  updatedServicios[index].precio = text;
                  setNewEvent({ ...newEvent, servicios: updatedServicios });
                }}
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              setNewEvent({
                ...newEvent,
                servicios: [
                  ...newEvent.servicios,
                  { nombre: '', descripcion: '', precio: '' },
                ],
              })
            }
          >
            <Text style={styles.addButtonText}>+ Agregar Servicio</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreateEvent}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creando...' : 'Crear Evento'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Eventos del Local</Text>
      <FlatList
        data={localData?.eventos || []}
        keyExtractor={(item, index) => item.nombre + index}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.nombre}</Text>
            <Text style={styles.eventDescription}>{item.descripcion}</Text>
            <Text style={styles.eventDate}>Fecha: {item.fecha}</Text>
            <Text style={styles.eventServices}>
              Servicios:
              {item.servicios.map(
                (servicio, index) =>
                  `\n- ${servicio.nombre}: $${servicio.precio} (${servicio.descripcion || 'Sin descripción'})`
              )}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 24,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  eventList: {
    marginTop: 16,
  },
});
