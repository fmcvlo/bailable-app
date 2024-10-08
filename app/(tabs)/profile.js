import React from 'react';
import { Text } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { Link } from 'expo-router';

export default function EventCard({ event }) {
  if (!event || !event.id || !event.image) {
    console.log('Event object is missing required properties:', event);
    return null; // Or show a placeholder/loading state
  }

  return (
    <Link
      href={{
        pathname: '/event/[id]',
        params: { id: String(event.id) },
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        containerStyle={{
          backgroundColor: '#2D3748',
          borderRadius: 15,
          padding: 15,
          marginBottom: 20,
        }}
      >
        <Image
          source={{ uri: event.image }}
          style={{ width: '100%', height: 150, borderRadius: 10 }}
        />
        <Card.Divider />
        <Text
          style={{ marginBottom: 10, color: '#ffffff', fontWeight: 'bold' }}
        >
          {event.title}
        </Text>
        <Text style={{ marginBottom: 10, color: '#ffffff' }}>
          {event.description}
        </Text>
        <Text style={{ marginTop: 10, color: '#ffffff' }}>
          {event.date} - {event.location}
        </Text>
      </Card>
    </Link>
  );
}
