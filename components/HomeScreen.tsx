import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import EventCard from './EventCard'; // Ensure this import points to your EventCard component
import places from '../constants/placesData';

export default function HomeScreen() {
  const renderPlace = ({ item }) => (
    <View className="my-4 w-full items-center">
      <EventCard event={item} />
    </View>
  );

  return (
    <View className="flex flex-col items-center bg-gray-100 min-h-screen">
      <View className="flex-row items-center bg-white w-full rounded-full shadow-md mb-4 px-2">
        <View className="flex-row items-center bg-gray-200 rounded-full flex-1 px-3 py-2">
          <FontAwesome
            name="search"
            size={20}
            color="#9CA3AF"
            className="mr-2"
          />
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-2"
            placeholder="Buscar..."
          />
        </View>
        <Avatar.Icon
          size={40}
          icon="bell-outline"
          className="bg-transparent mx-1"
        />
        <Avatar.Icon
          size={40}
          icon="account-circle"
          className="bg-transparent mx-1"
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
