<template>
  <h1>Techs Only</h1>

  <div v-if="isLoading"><span class="loading loading-infinity loading-lg"></span></div>
  <div v-else class="">
      <h2 class="text-xl">There are {{ data?.length }} Issues Needing Tech Assignment.</h2>
    <div v-if="data" class="w-full relative">
      <Transition>
        <TechPendingIssueItem
          :issue="state"
          :number-of-issues="pendingCount"
          :current="current"
          ref="pendingItem"
          :key="state.id"
            @next="handleNext"
            @prev="handlePrev"
          class="i absolute top-0 left-0 w-full h-full"
        />
      </Transition>

    </div>
   

  </div>
</template>

<script setup lang="ts">
import TechPendingIssueItem from '@/components/TechPendingIssueItem.vue'
import { useGetPendingIssuesForTech, type IssueWithDetails } from '@/components/api/issues'
import { onKeyStroke, useCycleList } from '@vueuse/core'
import { computed, effect, ref } from 'vue'
const { data, isLoading } = useGetPendingIssuesForTech()
let sorted = ref<IssueWithDetails[]>([])


const pendingCount = computed(() => {
  return data.value?.length || 0
})

const current = ref(1)
effect(() => {
  if (data.value) {
    sorted.value = data.value.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    })
  }
})



onKeyStroke(['ArrowRight', 'ArrowUp', 'l'], () => {
  handleNext()
})
function handleNext() {
    if (pendingCount.value === current.value) {
    current.value = 1
  } else {
    current.value++
  }

  next()
}

function handlePrev() {
    prev()
  if (current.value === 1) {
    current.value = pendingCount.value
  } else {
    current.value--
  }

}
onKeyStroke(['ArrowLeft', 'ArrowDown', 'k'], () => {
  handlePrev()
})
onKeyStroke('a', () => {
  console.log('adopting issue', state.value.id)
})
const { state, next, prev } = useCycleList(sorted, {})
</script>

<style scoped>
.i {


}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(5px);
  @apply brightness-0
}
</style>
