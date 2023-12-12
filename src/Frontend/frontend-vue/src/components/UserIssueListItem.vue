<script setup lang="ts">
const props = defineProps<{
    issue: IssueWithDetails
}>()
import { formatDate, useTimeAgo } from '@vueuse/core';
import type { IssueWithDetails } from './api/issues';

const timeAgo = useTimeAgo(new Date(props.issue.created));
</script>

<template>
 <div class="card bg-base-300 shadow-xl mb-4">
          <div class="card-body">
            <h2 class="card-title">Pending Issue</h2>
            <p>
                Created on {{ formatDate(new Date(issue.created), 'dddd, MMMM D, YYYY') }} at
                {{ formatDate(new Date(issue.created), 'h:m:s A') }} (about
                  {{  timeAgo }}).
              </p>
            <div class="ml-4 mt-8">
             
              <p class="font-bold">Description:</p>
              <p class="font-mono m-8 p-4 bg-slate-950 text-slate-300">
                {{ issue.description }}
              </p>
            </div>
            <p v-if="issue.status === 'AwaitingTechAssignment'">
              <span class="font-bold">Status:</span> This issue is awaiting a tech to adopt it.
            </p>
          </div>
        </div>

</template>