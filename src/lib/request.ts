import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios'

export type ServerResponse<T = unknown> = {
  statusCode: number
  message: string
  data: T
}

export type ServerError = Omit<ServerResponse, 'data'>

const handleError = <U = ServerError>(error: any): [U, null] => {
  if (error.status !== 403) {
    window.alert(error.data.message || 'Error')
  }
  return [error, null]
}

export class ClientRequest {
  private request: AxiosInstance

  constructor(config: CreateAxiosDefaults) {
    this.request = axios.create(config)

    this.request.interceptors.request.use((config) => {
      if (config.method?.toUpperCase() === 'POST') {
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    })

    this.request.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error.response)
      }
    )
  }

  async get<T = unknown, U = ServerError>(
    url: string,
    params?: unknown,
    config?: AxiosRequestConfig
  ) {
    type R = ServerResponse<T>
    return this.request
      .get<R>(url, { ...config, params })
      .then<[null, R]>((res) => [null, res.data])
      .catch<[U, null]>(handleError<U>)
  }

  async post<T = unknown, U = ServerError>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ) {
    type R = ServerResponse<T>
    return this.request
      .post<R>(url, data, config)
      .then<[null, R]>((res) => [null, res.data])
      .catch<[U, null]>(handleError<U>)
  }
}

export const clientRequestor = new ClientRequest({
  baseURL: 'https://api.nostr.community/',
  timeout: 10 * 1000,
})
