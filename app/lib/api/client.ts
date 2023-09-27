import axios, { AxiosInstance } from 'axios'

interface GetParams {
  [key: string]: string | number | boolean
}

interface PostData {
  url?: string
  phone?: string
  email?: string
  address?: string
  foreground?: string
  background?: string
  dimension?: string
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

  post(path: string, data: PostData) {
    return this.client.post(path, data)
  }
}

export type { GetParams, PostData }
export default APIClient
