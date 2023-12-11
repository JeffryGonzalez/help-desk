
import axios from 'axios'
import { useAuthQuery } from './auth';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

export type Contact =  {
    firstName: string;
    lastName: string;
    contactChannel: string;
    emailAddress: string;
    phoneNumber: string;
};



async function getContact<Contact>(id:string) {
   const {data} = await axios.get<Contact>(`/api/users/${id}/contact`)
   return data;
}

export function useGetContact():UseQueryReturnType<Contact, Error> {
    const {data} = useAuthQuery();
    const userId = data.value?.id;

    const result = useQuery<Contact>({
        queryKey: ['user', 'contact'],
        queryFn: () => getContact(userId!),
        enabled: !!userId
    })
    return result;
}
