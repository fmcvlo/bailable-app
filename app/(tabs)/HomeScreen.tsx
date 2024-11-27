import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { FontAwesome } from 'react-native-vector-icons';
import EventCard from '../../components/EventCard';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import { useFocusEffect } from 'expo-router';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchEventos = async () => {
    const genericService = new GenericHtppService();
    try {
      const date = new Date().toISOString().split('T')[0];
      console.log('Fecha actual:', date);
      const response = await genericService.httpGet(Endpoints.EVENTOS, {
        date,
      });

      const adaptedEvents = response.data.map(adaptEvent);
      console.log('Adapted Events:', adaptedEvents);
      setEvents(adaptedEvents);
      setError(null); // Limpia cualquier error previo
    } catch (err) {
      console.error('Error al obtener los eventos:', err);
      setError('No se pudieron cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  // Recargar eventos al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchEventos();
    }, [])
  );

  const renderPlace = ({ item }) => (
    <View style={styles.eventCardContainer}>
      <EventCard event={item} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
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
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <FontAwesome
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchInput} placeholder="Buscar..." />
        </View>
        <Avatar.Icon size={40} icon="bell-outline" style={styles.avatarIcon} />
        <Avatar.Icon
          size={40}
          icon="account-circle"
          style={styles.avatarIcon}
        />
      </View>
      <Text style={styles.title}>Boliches cercanos</Text>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={events}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderPlace}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4B5563',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  avatarIcon: {
    backgroundColor: 'transparent',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  eventCardContainer: {
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
});
