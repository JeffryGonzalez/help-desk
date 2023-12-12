<script setup lang="ts">
import { effect, ref } from 'vue'
import UserIssueListItem from './UserIssueListItem.vue'
import { useGetUserIssues, type IssueWithDetails } from './api/issues'

const { isLoading, isError, data } = useGetUserIssues()

let sorted = ref<IssueWithDetails[]>([])

effect(() => {
  if (data.value) {
    sorted.value = data.value.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    })
  }
})
</script>
<template>
  <h2 class="text-2xl font-bold py-4">Your Current Issues:</h2>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error</div>
  <div v-else>
    <p v-if="sorted.length === 0">You have current issues!</p>
    <ul v-else>
      <li v-for="issue in sorted" :key="issue.id">
        <UserIssueListItem :issue="issue" />
        
      </li>
    </ul>
  </div>
</template>
