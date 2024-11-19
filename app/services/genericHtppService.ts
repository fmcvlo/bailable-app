import axios from 'axios';

export class GenericHtppService {
  private baseUrl: string = 'http://10.0.2.2:5211';
  constructor() {}

  buildUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }
  async httpGet(url: string) {
    console.log(`${this.baseUrl}/${url}`);
    return axios.get(`${this.baseUrl}/${url}`);
  }

  async httpGetServicios(url: string, params: Record<string, any> = {}) {
    // Construir los query params manualmente
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${this.baseUrl}/${url}?${queryString}`;

    console.log(`GET Request to: ${fullUrl}`); // Verifica la URL completa

    // Realizar la solicitud con la URL completa
    return axios.get(fullUrl);
  }

  async httpGetEventos(url: string) {
    console.log(`${this.baseUrl}/${url}`);

    return axios.get(`http://10.0.2.2:5211/api/Eventos?date=2024-12-31`);
  }

  async httpPut(url: string, data: any) {
    return axios.put(`${this.baseUrl}/${url}`, data);
  }

  async httpDelete(url: string) {
    return axios.delete(`${this.baseUrl}/${url}`);
  }

  async httpPost(url: string, data: any) {
    return axios.post(`${this.baseUrl}/${url}`, data);
  }
}
