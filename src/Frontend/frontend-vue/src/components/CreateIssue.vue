<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { useAuthQuery } from './api/auth';

const {data} = useAuthQuery();
import { reset } from '@formkit/core';
import { useAddUserIssue } from './api/issues';

const { mutate, isPending} = useAddUserIssue();

function submitHandler(val:{description:string}) {
    console.log('submitHandler', val);
   mutate(val.description);
   reset("issue-form");
}
</script>

<template>
    <h1>Create an Issue</h1>
    <FormKit type="form" @submit="submitHandler" :vi-if="!isPending" id="issue-form">
        <FormKit type="textarea" validation="required|length:5,256" name="description"></FormKit>
    </FormKit>
</template>