import { useMutation, useQuery, useQueryClient, type UseMutationReturnType, type UseQueryReturnType } from "@tanstack/vue-query";
import axios, { AxiosError } from "axios";
import { useAuthQuery } from "./auth";

export type IssueWithDetails = {
    id: string;
    version: number;
    userId: string;
    created: string;
    description: string;
    status: 'AwaitingTechAssignment'
}

async function addUserIssue({userId,description}: {userId: string, description:string}) {
    const {data }= await axios.post<IssueWithDetails>(`/api/users/${userId}/issues`, {description});
  return data;
}

async function getIssueWithDetails(userId:string,issueId:string): Promise<IssueWithDetails> {
   const {data} = await axios.get<IssueWithDetails>(`/api/users/${userId}/${issueId}`)
   return data;
}

async function getUserIssues(userId:string): Promise<IssueWithDetails[]> {
   const {data} = await axios.get<IssueWithDetails[]>(`/api/users/${userId}/issues`)
   return data;
}
async function getPendingIssuesForTech(): Promise<IssueWithDetails[]> {
   return await axios.get<{issues: IssueWithDetails[]}>(`/api/techs/pending-issues`).then(res => res.data.issues)
}

export function useGetPendingIssuesForTech(): UseQueryReturnType<IssueWithDetails[], Error> {
    const result = useQuery<IssueWithDetails[]>({
        queryKey: ['tech', 'pending-issues'],
        queryFn: () => getPendingIssuesForTech(),
        enabled: true
    })
    return result;
}
export function useGetUserIssues(): UseQueryReturnType<IssueWithDetails[], Error> {
    const {data} = useAuthQuery();
    const userId = data.value?.id;
    const result = useQuery<IssueWithDetails[]>({
        queryKey: ['user', 'issues'],
        queryFn: () => getUserIssues(userId!),
        enabled: !!userId,
        retry: (_, error) => {
            const e = error as any;
            if (e?.response?.status === 404) return false
            return true
        },
       
    })
    return result;
}

export function useAddUserIssue() {
    const {data} = useAuthQuery();
    const userId = data.value?.id;
    const client = useQueryClient();
    return useMutation<IssueWithDetails, AxiosError, string, () => void>({
       mutationFn: (description:string) => addUserIssue({userId:userId!, description}),
       onSuccess: (data) => {
           client.setQueryData(['user', 'issues'], (old:IssueWithDetails[]|undefined) => {
               if(old) {
                   return [data, ...old];
               }
               return [data];
           })
       }
    })
   
}

