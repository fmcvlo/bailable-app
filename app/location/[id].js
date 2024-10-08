import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function LocationDetails() {
  const router = useRouter();

  // Asegúrate de que 'id' está disponible en router.query
  const { id } = useLocalSearchParams();

  const handleEventClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  if (!id) {
    return <Text>Locación no encontrada</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Locación {id}</Text>
      <Button
        title="Ver Evento de la Noche"
        onPress={() => handleEventClick(id)}
      />
    </View>
  );
}
