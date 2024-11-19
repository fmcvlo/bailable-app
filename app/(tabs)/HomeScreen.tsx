import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import EventCard from '../../components/EventCard'; // Asegúrate de que apunte correctamente
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';

export default function HomeScreen() {
  const [events, setEvents] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);

  const adaptEvent = (event) => ({
    id: event.evento_id || 'undefined-id',
    title: event.nombre || 'Título no disponible',
    description: event.descripcion || 'Descripción no disponible',
    date: event.date
      ? new Date(event.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      : 'Fecha no disponible',
    image: event.imgSource
      ? `http://your-server-url${event.imgSource}`
      : 'http://your-server-url/default-image.jpg',
  });

  useEffect(() => {
    const fetchEventos = async () => {
      const genericService = new GenericHtppService();
      try {
        const date = new Date().toISOString().split('T')[0];
        console.log('Fecha actual:', date);
        const response = await genericService.httpGet(Endpoints.EVENTOS, {
          date,
        });

        const adaptedEvents = response.data.map(adaptEvent);
        console.log('Adapted Events:', adaptedEvents); // Verifica los datos
        setEvents(adaptedEvents);
      } catch (err) {
        console.error('Error al obtener los eventos:', err);
        setError('No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const renderPlace = ({ item }) => (
    <View className="my-4 w-full items-center">
      <EventCard event={item} />
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
    <View className="flex flex-col items-center bg-gray-100 min-h-screen">
      <View className="flex-row items-center bg-white w-full rounded-full shadow-md mb-4 px-2">
        <View className="flex-row items-center bg-gray-200 rounded-full flex-1 px-3 py-2">
          <FontAwesome
            name="search"
            size={20}
            color="#9CA3AF"
            className="mr-2"
          />
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-2"
            placeholder="Buscar..."
          />
        </View>
        <Avatar.Icon
          size={40}
          icon="bell-outline"
          className="bg-transparent mx-1"
        />
        <Avatar.Icon
          size={40}
          icon="account-circle"
          className="bg-transparent mx-1"
        />
      </View>
      <Text className="text-2xl font-bold my-4">Boliches cercanos</Text>
      <FlatList
        className="flex-1 w-full"
        contentContainerStyle={{ alignItems: 'center' }}
        data={events}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Clave única para cada elemento
        renderItem={renderPlace}
      />
    </View>
  );
}
