import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CheckBox } from 'react-native-elements'; // Librería para CheckBox
import { Picker } from '@react-native-picker/picker';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Para obtener parámetros
import { GenericHtppService } from '../../services/genericHtppService';
import Endpoints from '../../../helpers/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationScreen() {
  const [services, setServices] = useState([]); // Estado para los servicios
  const [selectedServices, setSelectedServices] = useState([]); // Estado para los servicios seleccionados
  const [numPeople, setNumPeople] = useState('1'); // Número de personas seleccionadas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const params = useLocalSearchParams(); // Obtener los parámetros del link
  const eventoId = params.locationId; // GUID del evento desde los parámetros

  useEffect(() => {
    const fetchServices = async () => {
      const genericService = new GenericHtppService();
      try {
        const response = await genericService.httpGet(Endpoints.GET_SERVICES, {
          eventoId,
        });

        // Transformar los datos del servicio
        const fetchedServices = response.data.servicios.map((service) => ({
          id: service.servicioId,
          name: service.nombre,
          description: service.descripcion,
          price: service.precio,
        }));

        setServices(fetchedServices);
      } catch (err) {
        console.error('Error al obtener los servicios:', err);
        setError('No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    if (eventoId) {
      fetchServices(); // Llamar al servicio solo si eventoId está definido
    } else {
      setError('No se proporcionó un evento válido.');
      setLoading(false);
    }
  }, [eventoId]);

  const toggleServiceSelection = (id) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Si ya está seleccionado, lo eliminamos
        return prevSelected.filter((serviceId) => serviceId !== id);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSelected, id];
      }
    });
  };

  const renderService = ({ item }) => (
    <View className="flex-row items-center justify-between w-full px-4 py-3 border-b border-gray-300">
      {/* Nombre y descripción del servicio */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500">{item.description}</Text>
      </View>

      {/* Precio */}
      <Text className="w-1/4 text-base font-semibold text-gray-800 text-center">
        ${item.price}
      </Text>

      {/* Checkbox */}
      <CheckBox
        checked={selectedServices.includes(item.id)}
        onPress={() => toggleServiceSelection(item.id)}
        containerStyle={{ margin: 0, padding: 0 }}
      />
    </View>
  );

  const renderPeoplePicker = () => (
    <View className="mt-4">
      <Text className="text-base font-semibold text-gray-800">
        Cantidad de personas
      </Text>
      <Picker
        selectedValue={numPeople}
        onValueChange={(value) => setNumPeople(value)}
        style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: 4 }}
      >
        {[...Array(11).keys()]
          .filter((i) => i !== 0)
          .map((i) => (
            <Picker.Item key={i} label={String(i)} value={String(i)} />
          ))}
      </Picker>
    </View>
  );

  const handleComprar = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Obtener el userId del AsyncStorage

      if (!userId) {
        console.error('No se encontró userId en AsyncStorage.');
        Alert.alert('Error', 'No se encontró información del usuario.');
        return;
      }

      // Construir la estructura de los parámetros según lo que espera el endpoint
      const serviciosIds = selectedServices; // IDs de los servicios seleccionados
      const payload = {
        userId, // Usuario que hace la reserva
        eventoId, // ID del evento
        serviciosIds, // Lista de IDs de servicios seleccionados
        cantidadPersonas: parseInt(numPeople, 10), // Cantidad de personas (convertir a número)
      };

      console.log('Payload para reserva:', payload);

      const genericService = new GenericHtppService();
      const response = await genericService.httpPost(
        Endpoints.RESERVAS,
        payload
      );

      if (response.status == 200) {
        console.log('Reserva realizada con éxito:', response.data);
        Alert.alert('Éxito', 'Reserva realizada con éxito.');
      } else {
        console.error('Error al realizar la reserva:', response.data);
        Alert.alert('Error', 'Hubo un problema al realizar la reserva.');
      }
    } catch (error) {
      console.error('Error en handleComprar:', error);
      Alert.alert('Error', error.response.data.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
        Servicios Disponibles
      </Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
      />
      {renderPeoplePicker()}
      <TouchableOpacity
        className="mt-4 bg-yellow-500 py-3 rounded-md"
        onPress={handleComprar}
      >
        <Text className="text-center text-white font-semibold">COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
