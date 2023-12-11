<script setup lang="ts">
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
    <h2>Home</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="data">
      <p>Welcome {{  data?.firstName }}</p>
    </div>
  </main>
</template>
