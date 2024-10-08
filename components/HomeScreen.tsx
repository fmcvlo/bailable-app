import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import EventCard from './EventCard'; // Ensure this import points to your EventCard component
import places from '../constants/placesData';

export default function HomeScreen() {
  const router = useRouter();

  const renderPlace = ({ item }) => (
    <View className="my-4 w-full items-center">
      <EventCard event={item} />
    </View>
  );

  return (
    <View className="flex flex-col items-center bg-gray-100 min-h-screen">
      <View className="flex-row items-center p-4 bg-white w-full shadow-md">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-4"
          placeholder="Buscar..."
        />
        <Avatar.Icon
          size={40}
          icon="bell-outline"
          className="mr-4 bg-transparent"
        />
        <Avatar.Icon
          size={40}
          icon="account-circle"
          className="bg-transparent"
        />
      </View>
      <Text className="text-2xl font-bold my-4">Lugares Cercanos</Text>
      <FlatList
        className="flex-1 w-full"
        contentContainerStyle={{ alignItems: 'center' }}
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlace}
      />
    </View>
  );
}
