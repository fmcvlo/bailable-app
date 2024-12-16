import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import UserHeader from '../../components/UseHeader';
import Stats from '../../components/Stats';
import ReservationList from '../../components/ReservationList';
import { useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null); // Datos del usuario
  const [reservas, setReservas] = useState<any[]>([]); // Reservas del usuario
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('No se encontró información del usuario.');
        return;
      }

      const genericService = new GenericHtppService();

      // Obtener datos del usuario
      const userResponse = await genericService.httpGet(
        `${Endpoints.GET_USER}/${userId}`
      );
      setUser(userResponse.data);
      console.log('datos de usuario:', userResponse.data);

      // Obtener reservas del usuario
      const reservasResponse = await genericService.httpGet(
        `${Endpoints.GET_RESERVAS}`,
        { userId }
      );
      setReservas(reservasResponse.data.reservas || []);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar datos cada vez que se enfoca la página
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Muestra el indicador de carga durante la actualización
      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserHeader name={user.name} surname={user.surname} role={user.role} />
      <Stats reservations={reservas.length} followers={0} following={0} />
      <ReservationList reservations={reservas} />
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
});
