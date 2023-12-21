<script setup lang="ts">
import { reset } from '@formkit/core';
import { useAddUserIssue } from './api/issues';


const { mutate, isPending} = useAddUserIssue();

function submitHandler(val:{description:string}) {

   mutate(val.description);
   reset("issue-form");
}
</script>

<template>
   <h2 class="text-2xl font-bold py-4">Create an Issue</h2>
    <FormKit type="form" @submit="submitHandler" :vi-if="!isPending" id="issue-form">
        <FormKit type="textarea" validation="required|length:5,256" name="description"></FormKit>
    </FormKit>
</template>