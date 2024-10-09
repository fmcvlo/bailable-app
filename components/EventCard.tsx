import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

export default function EventCard({ event }) {
  if (!event || !event.id || !event.image) {
    console.log('Event object is missing required properties:', event);
    return null;
  }

  return (
    <Link
      href={{
        pathname: '/location/[locationId]', // Updated the parameter to 'locationId'
        params: { locationId: String(event.id) }, // Pass the dynamic parameter 'locationId'
      }}
      style={{ textDecoration: 'none' }}
      asChild
    >
      <StyledPressable className="active:opacity-70 active:border-white/50 mb-2 bg-gray-500/10 rounded-xl">
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
      </StyledPressable>
    </Link>
  );
}
