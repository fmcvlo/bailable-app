import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Reservation = {
  nombreEvento: string;
  fecha: string;
  precio: number;
  cantidadPersonas: number;
};

type ReservationListProps = {
  reservations: Reservation[];
};

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  const renderReserva = ({ item }: { item: Reservation }) => (
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
    <FlatList
      data={reservations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderReserva}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 10,
  },
  ticketItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    width: '100%',
    alignSelf: 'stretch',
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

export default ReservationList;
