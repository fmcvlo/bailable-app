import axios from 'axios';

export class GenericHtppService {
  private baseUrl: string = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  constructor() {}

  buildUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }
  async htppGet(url: string) {
    return axios.get(`${this.baseUrl}/${url}`);
  }

  async htppPut(url: string, data: any) {
    return axios.put(`${this.baseUrl}/${url}`, data);
  }

  async httpDelete(url: string) {
    return axios.delete(`${this.baseUrl}/${url}`);
  }

  async httpPost(url: string, data: any) {
    return axios.post(`${this.baseUrl}/${url}`, data);
  }
}
