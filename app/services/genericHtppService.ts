import axios from 'axios';

export class GenericHtppService {
  private baseUrl: string = 'http://10.0.2.2:5211';
  constructor() {}

  buildUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  async httpGet(url: string, params: Record<string, any> = {}) {
    // Construir los query params manualmente
    const queryString = new URLSearchParams(params).toString();
    console.log(`Query String: ${queryString}`);
    const fullUrl = `${this.baseUrl}/${url}?${queryString}`;

    console.log(`GET Request to: ${fullUrl}`); // Verifica la URL completa

    // Realizar la solicitud con la URL completa
    return axios.get(fullUrl);
  }

  async httpPut(url: string, data: any) {
    return axios.put(`${this.baseUrl}/${url}`, data);
  }

  async httpDelete(url: string) {
    return axios.delete(`${this.baseUrl}/${url}`);
  }

  async httpPost(url: string, data: any, params: Record<string, any> = {}) {
    const fullUrl = `${this.baseUrl}/${url}`;
    const requestBody = { ...data, ...params }; // Fusionar data con los parámetros

    console.log(`POST Request to: ${fullUrl} with body:`, requestBody);

    return axios.post(fullUrl, requestBody);
  }
}
