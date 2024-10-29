import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const eventDetails = {
  title: 'PICHEO FEST. (+18)',
  date: 'Desde el 28 de Octubre 2024 a las 00:00 hasta el 29 de Octubre 2024 a las 23:55',
  image: 'https://via.placeholder.com/800x400',
  tickets: [
    {
      id: 1,
      tipo: 'MESA VIP STAGE',
      valor: '$700.000',
      descripcion: 'MESA VIP PARA 10 PERSONAS, %50 DEL VALOR EN CONSUMISIÓN',
    },
    {
      id: 2,
      tipo: 'ACCESO GENERAL + CONSUMISIÓN',
      valor: '$200.000',
      descripcion: 'ACCESO GENERAL + 1 BOTELLA',
    },
    {
      id: 3,
      tipo: 'ACCESO GENERAL',
      valor: '$75.000',
      descripcion: 'ACCESO A PISTA',
    },
  ],
};

export default function LocationScreen() {
  const [selectedQuantities, setSelectedQuantities] = useState(
    eventDetails.tickets.reduce(
      (acc, ticket) => ({ ...acc, [ticket.id]: '0' }),
      {}
    )
  );

  const handleQuantityChange = (id, value) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const renderTicket = ({ item }) => (
    <View className="flex-row items-center justify-between w-full px-4 py-3 border-b border-gray-300">
      {/* Ticket Info */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.tipo}
        </Text>
        <Text className="text-xs text-gray-500">{item.descripcion}</Text>
      </View>

      {/* Ticket Price */}
      <Text className="w-1/4 text-base font-semibold text-gray-800 text-center">
        {item.valor}
      </Text>

      {/* Quantity Picker with Display */}
      <View className="w-1/4 flex-row items-center justify-end">
        <Text className="text-base text-gray-800 mr-1">
          {selectedQuantities[item.id]}
        </Text>
        <Picker
          selectedValue={selectedQuantities[item.id]}
          onValueChange={(value) => handleQuantityChange(item.id, value)}
          style={{ width: 50 }}
          className="bg-gray-200 border border-gray-300 rounded-md"
        >
          {[...Array(11).keys()].map((i) => (
            <Picker.Item key={i} label={String(i)} value={String(i)} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
        {eventDetails.title}
      </Text>
      <View className="flex-row items-center justify-center mb-4">
        <FontAwesome name="calendar" size={16} color="#FFC107" />
        <Text className="text-sm text-yellow-500 ml-2">
          {eventDetails.date}
        </Text>
      </View>
      <Image
        source={{ uri: eventDetails.image }}
        className="w-full h-48 rounded-lg mb-4"
      />

      {/* Header Row */}
      <View className="flex-row justify-between w-full px-4 py-2 bg-gray-200 border-b border-gray-300">
        <Text className="flex-1 text-lg font-semibold text-gray-800">
          Tipo de Ticket
        </Text>
        <Text className="w-1/4 text-lg font-semibold text-gray-800 text-center">
          Valor
        </Text>
        <Text className="w-1/4 text-lg font-semibold text-gray-800 text-center">
          Cantidad
        </Text>
      </View>

      {/* Ticket Rows */}
      <FlatList
        data={eventDetails.tickets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTicket}
      />

      <TouchableOpacity className="mt-4 bg-yellow-500 py-3 rounded-md">
        <Text className="text-center text-white font-semibold">COMPRAR</Text>
      </TouchableOpacity>

      <Text className="text-center text-pink-600 font-bold text-sm mt-4">
        Evento solo para Mayores de 18 Años.
      </Text>
      <Text className="text-center text-gray-500 text-sm mt-2">
        Veni a la fiesta mas linda de Buenos Aires
      </Text>
    </View>
  );
}
