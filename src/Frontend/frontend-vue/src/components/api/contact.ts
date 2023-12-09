
import axios from 'axios'

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

