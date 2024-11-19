import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../interfaces/authService';
import { GenericHtppService } from './genericHtppService';
import { Endpoints } from '../../helpers/endpoints';

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

  async login(data: { password: string; email: string }) {
    const genericService = new GenericHtppService();
    const response = await genericService
      .httpGet(Endpoints.AUTH_LOGIN, data)
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
