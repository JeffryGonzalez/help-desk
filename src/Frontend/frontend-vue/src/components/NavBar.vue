<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
const { isTech } = useAuthStore()
</script>
<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Help Desk</RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-if="isTech"><RouterLink to="techs">Techs</RouterLink></li>
      
        <li><a class="btn btn-info btn-sm" href="/api/logout">Log Off</a></li>
      </ul>
    </div>
  </nav>
</template>
