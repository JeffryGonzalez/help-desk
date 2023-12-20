<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { effect, ref } from 'vue'
import { useAuthQuery } from './api/auth'
import { useClipboard } from '@vueuse/core'
import IconCopy from '@/components/icons/IconCopy.vue'
const { isLoading, isError, data } = useAuthQuery()
const roles = ref(`{
  "roles": ["tech"]  
}`)

const { copy } = useClipboard()
const { setIsTech, setId } = useAuthStore()

effect(() => {
  if (data.value) {
    setIsTech(data.value.isTech)
    setId(data.value.id)
  }
})
</script>

<template>
  <span v-if="isLoading"><span class="loading loading-infinity loading-lg"></span></span>
  <span v-else-if="isError">
    <div class="">
      <div class="m-auto container">
        <p>
          You need to be authenticated to use this app. When you click the login button, you can use
          any name you like.
        </p>
        <p class="pb-8 ">
          If you would like to be logged in as a tech, copy the following and put it in the
          additional claims box:
        </p>
        <div class="relative">
          <pre class="text-lg text-gray-800 bg-gray-100 rounded-md p-4 font-mono "
            >{{ roles }}
           </pre
          >
          <div class="absolute top-0 right-0 p-2">
            <button type="button" class="">
              <IconCopy class="w-4 h-4 text-slate-600 hover:text-slate-300" @click="copy(roles)" />
            </button>
          </div>
        </div>

        <a class="btn btn-lg btn-primary mt-8" href="/api/login">Login Please</a>
      </div>
      <div></div>
    </div>
  </span>
  <span v-else>
    <slot />
  </span>
</template>
