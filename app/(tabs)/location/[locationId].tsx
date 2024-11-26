import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GenericHtppService } from '../../services/genericHtppService';
import Endpoints from '../../../helpers/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message'; // Importamos FlashMessage
import ServiceItem from '../../../components/ServicesItem';
import PeoplePicker from '../../../components//PeoplePicker';

const LocationScreen: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [numPeople, setNumPeople] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(true);

  const params = useLocalSearchParams();
  const eventoId = params.locationId as string; // Cast para TypeScript

  useEffect(() => {
    const fetchServices = async () => {
      const genericService = new GenericHtppService();
      try {
        const response = await genericService.httpGet(Endpoints.GET_SERVICES, {
          eventoId,
        });

        const fetchedServices = response.data.servicios.map((service: any) => ({
          id: service.servicioId,
          name: service.nombre,
          description: service.descripcion,
          price: service.precio,
        }));

        setServices(fetchedServices);
      } catch (err) {
        console.error('Error al obtener los servicios:', err);
        showMessage({
          message: 'Error',
          description: 'No se pudieron cargar los datos.',
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    };

    if (eventoId) {
      fetchServices();
    } else {
      showMessage({
        message: 'Error',
        description: 'No se proporcionó un evento válido.',
        type: 'danger',
      });
      setLoading(false);
    }
  }, [eventoId]);

  const toggleServiceSelection = (id: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((serviceId) => serviceId !== id)
        : [...prevSelected, id]
    );
  };

  const handleComprar = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        console.error('No se encontró userId en AsyncStorage.');
        showMessage({
          message: 'Error',
          description: 'No se encontró información del usuario.',
          type: 'danger',
        });
        return;
      }

      const payload = {
        userId,
        eventoId,
        serviciosIds: selectedServices,
        cantidadPersonas: parseInt(numPeople, 10),
      };

      console.log('Payload para reserva:', payload);

      const genericService = new GenericHtppService();
      const response = await genericService.httpPost(
        Endpoints.RESERVAS,
        payload
      );

      if (response.status === 200) {
        console.log('Reserva realizada con éxito:', response.data);
        showMessage({
          message: 'Éxito',
          description: 'Reserva realizada con éxito.',
          type: 'success',
        });
      } else {
        console.error('Error al realizar la reserva:', response.data);
        showMessage({
          message: 'Error',
          description: 'Hubo un problema al realizar la reserva.',
          type: 'danger',
        });
      }
    } catch (error: any) {
      console.error('Error en handleComprar:', error);
      showMessage({
        message: 'Error',
        description: error.response?.data?.message || 'Error desconocido.',
        type: 'danger',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios Disponibles</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceItem
            item={item}
            isSelected={selectedServices.includes(item.id)}
            toggleSelection={toggleServiceSelection}
          />
        )}
      />
      <PeoplePicker numPeople={numPeople} setNumPeople={setNumPeople} />
      <TouchableOpacity style={styles.buyButton} onPress={handleComprar}>
        <Text style={styles.buyButtonText}>COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    marginTop: 16,
    backgroundColor: '#FBBF24',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LocationScreen;
