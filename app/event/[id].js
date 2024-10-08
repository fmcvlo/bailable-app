import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const handlePurchase = (item) => {
    alert(`Has comprado ${item}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Evento {id}</Text>
      <View className="space-y-4 w-3/4">
        <Button
          title="Comprar Entrada"
          onPress={() => handlePurchase('entrada')}
          color="#1E40AF"
        />
        <Button
          title="Comprar Bebida"
          onPress={() => handlePurchase('bebida')}
          color="#1E40AF"
        />
        <Button
          title="Combo Entrada + Bebida"
          onPress={() => handlePurchase('combo')}
          color="#1E40AF"
        />
      </View>
    </View>
  );
}
