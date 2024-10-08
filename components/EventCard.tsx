import React from 'react';
import { View, Text, Image } from 'react-native';
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
        pathname: '/event/[id]',
        params: { id: String(event.id) },
      }}
      style={{ textDecoration: 'none' }}
    >
      <View className="bg-gray-900 w-80 h-48 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <Image source={{ uri: event.image }} className="w-full h-28" />
        <View className="p-4 flex-row items-center justify-between">
          <View className="bg-black rounded-lg p-1 w-16 items-center justify-center">
            <Text className="text-white text-lg font-bold">
              {event.date.split(' ')[0]}
            </Text>
            <Text className="text-white text-sm">
              {event.date.split(' ')[1]}
            </Text>
          </View>
          <View className="flex-1 ml-4">
            <Text numberOfLines={1} className="text-white text-xl font-bold">
              {event.title}
            </Text>
            <Text numberOfLines={1} className="text-gray-400 text-sm mt-1">
              {event.description}
            </Text>
          </View>
          <View className="ml-4">
            <Icon name="person" size={24} color="#9CA3AF" />
          </View>
        </View>
      </View>
    </Link>
  );
}
