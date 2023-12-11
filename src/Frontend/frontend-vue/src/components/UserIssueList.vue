<script setup lang="ts">
import { ref } from 'vue';
import { useGetUserIssues, type IssueWithDetails } from './api/issues';

import { formatDate } from '@vueuse/core';
import { effect } from 'vue';

const {isLoading, isError, data} = useGetUserIssues();

let sorted = ref<IssueWithDetails[]>([]);

effect(() => {
    if(data.value) {
        sorted.value = data.value.sort((a,b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
    }

})
</script>
<template>
    <h1>User Issues</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else>
        <ul>
            <li v-for="issue in sorted" :key="issue.id">
                <p>{{issue.description}}</p>
                <p>Created on {{  formatDate(new Date(issue.created), 'dddd, MMMM D, YYYY')}} at {{  formatDate(new Date(issue.created), 'h:m:s A') }}</p>
                <p v-if="issue.status === 'AwaitingTechAssignment'">This issue is awaiting a tech to adopt it.</p>
            </li>
        </ul>
        </div>
</template>