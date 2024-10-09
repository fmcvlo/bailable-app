import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: 'blue,', headerShown: false }}
    >
      <Tabs.Screen
        name="index"
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
          href: null,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="map-marker" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
