import { Tabs } from 'expo-router';
import {} from '../services/useAuth';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFBD3F',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[userId]"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="location/[locationId]"
        options={{
          title: 'Location',
          href: null, // No permite que esta ruta sea accesible directamente
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="map-marker" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
