import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { FontAwesome } from 'react-native-vector-icons';
import { GenericHtppService } from '../services/genericHtppService';
import Endpoints from '../../helpers/endpoints';
import { useFocusEffect, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocalesScreen() {
  const [locales, setLocales] = useState([]);
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adaptLocal = (local) => ({
    id: local.localId || 'undefined-id',
    name: local.nombre || 'Nombre no disponible',
    address: local.direccion || 'Dirección no disponible',
    image: local.image
      ? `http://your-server-url${local.image}`
      : 'http://your-server-url/default-image.jpg',
  });

  const fetchLocales = async () => {
    const genericService = new GenericHtppService();
    try {
      const duenioId = await AsyncStorage.getItem('userId');
      const response = await genericService.httpGet(Endpoints.LOCALES, {
        duenioId,
      });
      const adaptedLocales = response.data.map(adaptLocal);
      setLocales(adaptedLocales);
      setFilteredLocales(adaptedLocales);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchLocales();
    }, [])
  );

  useEffect(() => {
    if (searchText === '') {
      setFilteredLocales(locales);
    } else {
      const filtered = locales.filter(
        (local) =>
          local.name.toLowerCase().includes(searchText.toLowerCase()) ||
          local.address.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredLocales(filtered);
    }
  }, [searchText, locales]);

  const renderLocal = ({ item }) => (
    <View style={{ width: 350, marginBottom: 16 }}>
      <Link href={`/local/${item.id}`} asChild>
        <View style={styles.localCard}>
          <Avatar.Image
            size={70}
            source={{ uri: item.image }}
            style={styles.avatar}
          />
          <View style={styles.localInfo}>
            <Text style={styles.localName}>{item.name}</Text>
            <Text style={styles.localAddress}>{item.address}</Text>
          </View>
        </View>
      </Link>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <FontAwesome
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar locales..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>
      <Text style={styles.title}>Mis Locales</Text>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={filteredLocales}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderLocal}
        style={{ width: '100%' }}
      />
      <Link href="/CrearLocalScreen" asChild>
        <Button mode="contained" style={styles.createButton}>
          Crear Local
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4B5563',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 16,
    width: '100%',
  },
  localCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: 350,
    height: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  localInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  localName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  localAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  createButton: {
    marginVertical: 16,
    alignSelf: 'center',
  },
});
