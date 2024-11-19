import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Para obtener parámetros
import { GenericHtppService } from '../../services/genericHtppService';
import Endpoints from '../../../helpers/endpoints';

export default function LocationScreen() {
  const [services, setServices] = useState([]); // Estado para los servicios
  const [selectedQuantities, setSelectedQuantities] = useState({}); // Estado para cantidades seleccionadas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const params = useLocalSearchParams(); // Obtener los parámetros del link
  const eventoId = params.locationId; // GUID del evento desde los parámetros

  useEffect(() => {
    const fetchServices = async () => {
      const genericService = new GenericHtppService();
      try {
        // Solicitud al endpoint con el eventoId como query param
        const response = await genericService.httpGetServicios(
          Endpoints.GET_SERVICES,
          { eventoId }
        );

        // Filtrar los datos necesarios y almacenarlos en el estado
        const filteredServices = response.data.servicios.map((service) => ({
          id: service.servicioId,
          tipo: service.nombre,
          descripcion: service.descripcion,
          valor: `$${service.precio}`,
        }));

        setServices(filteredServices);

        // Configurar el estado inicial para las cantidades seleccionadas
        setSelectedQuantities(
          filteredServices.reduce(
            (acc, service) => ({ ...acc, [service.id]: '0' }),
            {}
          )
        );
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

  const handleQuantityChange = (id, value) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const renderTicket = ({ item }) => (
    <View className="flex-row items-center justify-between w-full px-4 py-3 border-b border-gray-300">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.tipo}
        </Text>
        <Text className="text-xs text-gray-500">{item.descripcion}</Text>
      </View>
      <Text className="w-1/4 text-base font-semibold text-gray-800 text-center">
        {item.valor}
      </Text>
      <View className="w-1/4 flex-row items-center justify-end">
        <Text className="text-base text-gray-800 mr-1">
          {selectedQuantities[item.id]}
        </Text>
        <Picker
          selectedValue={selectedQuantities[item.id]}
          onValueChange={(value) => handleQuantityChange(item.id, value)}
          style={{ width: 50 }}
          className="bg-gray-200 border border-gray-300 rounded-md"
        >
          {[...Array(11).keys()].map((i) => (
            <Picker.Item key={i} label={String(i)} value={String(i)} />
          ))}
        </Picker>
      </View>
    </View>
  );

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
      <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
        Servicios Disponibles
      </Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/800x400' }}
        className="w-full h-48 rounded-lg mb-4"
      />
      <View className="flex-row justify-between w-full px-4 py-2 bg-gray-200 border-b border-gray-300">
        <Text className="flex-1 text-lg font-semibold text-gray-800">
          Tipo de Servicio
        </Text>
        <Text className="w-1/4 text-lg font-semibold text-gray-800 text-center">
          Valor
        </Text>
        <Text className="w-1/4 text-lg font-semibold text-gray-800 text-center">
          Cantidad
        </Text>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderTicket}
      />
      <TouchableOpacity className="mt-4 bg-yellow-500 py-3 rounded-md">
        <Text className="text-center text-white font-semibold">COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
