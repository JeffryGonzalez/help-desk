
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import axios from 'axios';
import { useAuthQuery } from './auth';


export type Contact =  {
    firstName: string;
    lastName: string;
    contactChannel: string;
    emailAddress: string;
    phoneNumber: string;
};



export async function getContact<Contact>(id:string) {
   const {data} = await axios.get<Contact>(`/api/users/${id}/contact`)
   return data;
}

export function useGetContact():UseQueryReturnType<Contact, Error> {
    const {data} = useAuthQuery();
    const userId = data.value?.id;

    const result = useQuery<Contact>({
        queryKey: ['user', 'contact'],
        queryFn: () => getContact(userId!),
        enabled: !!userId,
        retry: (_, error) => {
            const e = error as any;
            if (e?.response?.status === 404) return false
            return true
        },
       
    })
    return result;
}

export function useGetContactForIssue(userId:string) {
    const result = useQuery<Contact>({
        queryKey: ['users', 'contact', userId],
        queryFn: () => getContact(userId),
        
        retry: (_, error) => {
            const e = error as any;
            if (e?.response?.status === 404) return false
            return true
        },
       
    })
    return result;
}
