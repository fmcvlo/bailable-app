import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, Button, Divider } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data with mock data if no backend is available
    const mockUserData = {
      id: userId || 'default-user',
      name: 'Franco Machiavello',
      profileImage: 'https://example.com/profile-image.jpg',
      events: 0,
      followers: 0,
      following: 0,
    };

    // Simulate a data fetch with a delay to represent future API integration
    const fetchUser = async () => {
      setLoading(true);
      // Simulating network delay
      setTimeout(() => {
        setUser(mockUserData);
        setLoading(false);
      }, 1000);
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!user) {
    return <Text>Error loading user data.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: user.profileImage }} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Button mode="outlined" style={styles.editButton}>
            Editar
          </Button>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.events}</Text>
          <Text style={styles.statLabel}>Eventos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Seguidos</Text>
        </View>
      </View>

      <Divider style={{ marginVertical: 10 }} />

      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>TICKETS</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://example.com/no-tickets.png' }}
          style={styles.noTicketsImage}
        />
        <Text style={styles.noTicketsText}>No hay tickets</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTicketsImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  noTicketsText: {
    fontSize: 18,
    color: 'gray',
  },
});
