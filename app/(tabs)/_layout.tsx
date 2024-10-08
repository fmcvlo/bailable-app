import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="event/[id]" options={{ href: null }} />
      <Tabs.Screen name="location/[id]" options={{ href: null }} />
    </Tabs>
  );
}
