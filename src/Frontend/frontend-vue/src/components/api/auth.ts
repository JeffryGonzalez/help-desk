import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import axios from 'axios'

type Claim = {
  type: string
  value: string
}
export type UserState = {
  id: string
  isTech: boolean
}
export async function getUser() {
  const { data } = await axios<Claim[]>({
    method: 'get',
    url: '/api/user'
  })
  if (data) {
    const userId = data.find((x) => x.type === 'stream_id')?.value
    const isTech = data.some((x) => x.type === 'roles' && x.value === 'tech')
    return { id: userId, isTech } as UserState
  } else {
    return { id: '', isTech: false } as UserState
  }
}
export function useAuthQuery(): UseQueryReturnType<UserState, Error> {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: (_, error) => {
      console.log(error);
      const e = error as any;
      if (e?.response?.status === 401) return false
      return true
    },
   refetchInterval: 50_000
  })
}
