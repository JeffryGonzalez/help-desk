<script setup lang="ts">
import {  RouterView } from 'vue-router'
import AuthCheck from './components/AuthCheck.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <AuthCheck>
    <header>
      <NavBar></NavBar>
      
      
    </header>
    
    <main class="container mx-auto">
      <RouterView />
    </main>
  </AuthCheck>
</template>


