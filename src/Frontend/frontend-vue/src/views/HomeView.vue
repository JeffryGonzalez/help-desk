<script setup lang="ts">
import CreateIssue from '@/components/CreateIssue.vue';
import UserIssueList from '@/components/UserIssueList.vue';
import { useGetContact } from '@/components/api/contact';
import { effect } from 'vue';
import { useRouter } from 'vue-router';


const { isLoading, data} = useGetContact();
const router = useRouter();

effect(() => {
  if(isLoading.value === false &&  data.value === undefined) {
    router.push('/create-profile');
  }
});


</script>

<template>
  <main>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="data">
      <p>Welcome {{  data?.firstName }} {{  data?.lastName }}</p>
      <CreateIssue />
      <UserIssueList />
    </div>
  </main>
</template>
