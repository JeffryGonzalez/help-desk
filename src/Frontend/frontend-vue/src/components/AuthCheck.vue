<script setup lang="ts">

import { effect } from 'vue';
import {useAuthQuery} from './api/auth';
import { useAuthStore } from '@/stores/auth-store'

const { isLoading, isError, data } = useAuthQuery()
const { setIsTech,setId } = useAuthStore();

effect(() => {
  if(data.value) {
    setIsTech(data.value.isTech);
    setId(data.value.id);
  }
});
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError"><a href="/api/login">Login Please</a></span>
  <span v-else>
  <slot />
</span>
</template>
