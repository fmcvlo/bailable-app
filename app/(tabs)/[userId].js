import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Avatar, Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';

export default function ProfileScreen() {
  const [user, setUser] = useState(null); // Datos del usuario
  const [reservas, setReservas] = useState([]); // Reservas del usuario
  const [loadingUser, setLoadingUser] = useState(true); // Estado de carga para el usuario
  const [loadingReservas, setLoadingReservas] = useState(true); // Estado de carga para las reservas

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Error', 'No se encontró información del usuario.');
          setLoadingUser(false);
          return;
        }

        const genericService = new GenericHtppService();

        // Obtener datos del usuario
        const userResponse = await genericService.httpGet(
          `${Endpoints.GET_USER}/${userId}`
        );
        setUser(userResponse.data);

        // Obtener reservas del usuario
        const reservasResponse = await genericService.httpGet(
          `${Endpoints.GET_RESERVAS}`,
          { userId }
        );
        setReservas(reservasResponse.data.reservas || []);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los datos.');
      } finally {
        setLoadingUser(false);
        setLoadingReservas(false);
      }
    };

    fetchUserData();
  }, []);

  if (loadingUser || loadingReservas) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error al cargar los datos del usuario.</Text>
      </View>
    );
  }

  const renderReserva = ({ item }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.eventName}>{item.nombreEvento}</Text>
      <Text style={styles.eventDate}>
        Fecha: {new Date(item.fecha).toLocaleDateString()}
      </Text>
      <Text style={styles.eventPrice}>Precio: ${item.precio}</Text>
      <Text style={styles.eventPeople}>Personas: {item.cantidadPersonas}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado del perfil */}
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: 'https://example.com/default-avatar.png' }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{`${user.name} ${user.surname}`}</Text>
          <Button mode="outlined" style={styles.editButton}>
            Editar
          </Button>
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reservas.length}</Text>
          <Text style={styles.statLabel}>Reservas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Seguidos</Text>
        </View>
      </View>

      <Divider style={{ marginVertical: 10 }} />

      {/* Sección de Tickets */}
      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>TICKETS</Text>
      </View>

      <View style={styles.content}>
        {reservas.length > 0 ? (
          <FlatList
            data={reservas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderReserva}
          />
        ) : (
          <Text style={styles.noTicketsText}>No hay tickets</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTicketsText: {
    fontSize: 18,
    color: 'gray',
  },
  ticketItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: 'gray',
  },
  eventPrice: {
    fontSize: 14,
  },
  eventPeople: {
    fontSize: 14,
  },
});
