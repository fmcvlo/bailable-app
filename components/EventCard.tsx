import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EventCard({ event }) {
  if (!event || !event.id || !event.image) {
    console.log('Event object is missing required properties:', event);
    return null;
  }

  return (
    <Link
      href={{
        pathname: '/location/[locationId]',
        params: { locationId: String(event.id) },
      }}
      asChild
    >
      <Pressable style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Imagen del evento */}
          <Image
            source={{ uri: event.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Contenido del evento */}
          <View style={styles.content}>
            {/* Fecha */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateDay}>{event.date.split(' ')[0]}</Text>
              <Text style={styles.dateMonth}>{event.date.split(' ')[1]}</Text>
            </View>
            {/* Título y descripción */}
            <View style={styles.details}>
              <Text numberOfLines={1} style={styles.title}>
                {event.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {event.description}
              </Text>
            </View>
            {/* Icono */}
            <View style={styles.iconContainer}>
              <Icon name="person" size={24} color="#9CA3AF" />
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)', // Reemplazo para bg-gray-500/10
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#1F2937', // bg-gray-900
    width: 320,
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Sombra para Android
  },
  image: {
    width: '100%',
    height: 112, // Altura de la imagen
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  dateDay: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateMonth: {
    color: '#FFF',
    fontSize: 12,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  iconContainer: {
    marginLeft: 16,
  },
});
