<template>
  <div class="">
    <div class="m-4 pb-2">
      <button ref="leftButton" @click="handle('prev')" >
        <kbd class="kbd">←</kbd>
      </button>
      <span class="px-3 text-sm font-light">{{ current }} of {{numberOfIssues}}</span>
      <button ref="rightButton" @click="handle('next')" >
        <kbd class="kbd">→</kbd>
      </button>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <p class="text-sm">
            <span class="text-lg font-bold">Logged {{ formatDate(new Date(issue.created), 'dddd MMM Do, YYYY') }} </span>
            {{ formatDate(new Date(issue.created), 'h:m:s A') }} ({{ timeAgo }}).
          </p>
          <p class="font-mono text-sm p-4 bg-slate-950 text-slate-300">
            {{ issue.description }}
          </p>


          <div>
            <button class="btn btn-xs btn-primary" @click="onAdoptIssue(issue.id)">
              Adopt Issue
            </button>
 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, useTimeAgo } from '@vueuse/core';
import type { IssueWithDetails } from './api/issues';
import { useGetContactForIssue } from './api/contact';

function handle(what: 'next' | 'prev') {
 if(what === 'next') {
    emits('next');
 } else {
    emits('prev');

 }
}

const props = defineProps<{
  issue: IssueWithDetails
  current:number
  numberOfIssues: number
}>()

const emits = defineEmits<{
  (e: 'next'): void
  (e: 'prev'): void
}>()

const timeAgo = useTimeAgo(new Date(props.issue.created), { controls: false})

function onAdoptIssue(id: string) {
  console.log('adopting issue', id)
  timeAgo.effect.stop();
  
}

</script>
