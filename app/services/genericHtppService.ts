import axios, { AxiosResponse, AxiosError } from 'axios';

export class GenericHtppService {
  private baseUrl: string = 'http://localhost:5211';
  private debug: boolean = true;
  private timeout: number = 10000; // 10 segundos

  constructor() {
    axios.defaults.timeout = this.timeout;

    // Interceptor para registrar respuestas
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        this.log('=== RESPONSE ===', {
          url: response.config.url,
          method: response.config.method,
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error: AxiosError) => {
        this.log('=== RESPONSE ERROR ===', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        if (error.response?.status === 401) {
          console.warn('Token expirado o no válido. Redirigir al login.');
        }
        return Promise.reject(error);
      }
    );
  }

  buildUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  async httpGet(url: string, params: Record<string, any> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${this.baseUrl}/${url}?${queryString}`;

    this.log('=== GET REQUEST ===', { url: fullUrl, params });
    return axios.get(fullUrl);
  }

  async httpPut(url: string, data: any) {
    const fullUrl = this.buildUrl(url);

    this.log('=== PUT REQUEST ===', { url: fullUrl, data });
    return axios.put(fullUrl, data);
  }

  async httpDelete(url: string) {
    const fullUrl = this.buildUrl(url);

    this.log('=== DELETE REQUEST ===', { url: fullUrl });
    return axios.delete(fullUrl);
  }

  async httpPost(url: string, data: any, params: Record<string, any> = {}) {
    const fullUrl = this.buildUrl(url);
    const requestBody = { ...data, ...params };

    this.log('=== POST REQUEST ===', { url: fullUrl, body: requestBody });
    return axios.post(fullUrl, requestBody);
  }

  log(message: string, data: any = {}) {
    if (this.debug) {
      console.log(message, JSON.stringify(data, null, 2));
    }
  }
}
