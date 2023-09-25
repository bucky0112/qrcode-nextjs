import axios, { AxiosInstance } from 'axios'

interface GetParams {
  [key: string]: string | number | boolean
}

class APIClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  get(path: string, params?: GetParams) {
    return this.client.get(path, { params })
  }
}

export type { GetParams }
export default APIClient
