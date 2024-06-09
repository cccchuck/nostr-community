import { clientRequestor } from '@/lib/request'
import * as ServiceType from './type'

export const service = {
  queryUser: async (code: string) => {
    return await clientRequestor.get<ServiceType.QueryUserResponse>(
      `/discord/query-user?code=${code}`
    )
  },

  bindUser: async (data: ServiceType.BindUserRequest) => {
    return await clientRequestor.post<ServiceType.BindUserResponse>(
      '/discord/bind-user',
      data
    )
  },
}
