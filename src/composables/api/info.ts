import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@vueuse/integrations/useAxios'
import { axiosInstance } from '@/services/qbit'
import type { MainDataResponse, SessionInfoResponse } from '@/types/qbit/responses'

const pollingRate = 1000

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await useAxios<SessionInfoResponse>('/transfer/info', axiosInstance)
      return data.value
    },
    refetchInterval: pollingRate
  })
}

export const useMainData = (rid?: number) => {
  return useQuery({
    queryKey: ['maindata'],
    queryFn: async () => {
      const { data } = await useAxios<MainDataResponse>(
        '/sync/maindata',
        {
          params: {
            rid
          }
        },
        axiosInstance
      )

      return data.value
    },
    refetchInterval: pollingRate
  })
}