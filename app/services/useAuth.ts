import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../interfaces/authService';
import { GenericHtppService } from './genericHtppService';
import { Endpoints } from '../../helpers/endpoints';
/*
const USER_KEY = 'userToken';

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Asegúrate de que sea JSON válido
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: any) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)); // Asegúrate de usar JSON.stringify
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { user, loading, login, logout };
}
*/

export class authService {
  AUTH = 'auth';
  constructor() {}

  async setUser(user: AuthState) {
    await AsyncStorage.setItem(this.AUTH, JSON.stringify(user));
  }

  async getUser() {
    const user = await AsyncStorage.getItem(this.AUTH);

    if (user == undefined) return null;
    return JSON.parse(user) as AuthState;
  }

  async logout() {
    await localStorage.clear();
  }

  async login(data: { password: string; username: string }) {
    const genericService = new GenericHtppService();
    const response = await genericService
      .httpPost(Endpoints.AUTH_LOGIN, data)
      .then((res) => {
        return { success: true, data: res.data, error: null };
      })
      .catch((err) => {
        return { success: false, data: null, error: err };
      });

    return response;
  }

  async register(data: { password: string; username: string }) {
    const genericService = new GenericHtppService();
    const response = await genericService
      .httpPost(Endpoints.AUTH_REGISTER, data)
      .then((res) => {
        return { success: true, data: res.data, error: null };
      })
      .catch((err) => {
        return { success: false, data: null, error: err };
      });

    return response;
  }
}
