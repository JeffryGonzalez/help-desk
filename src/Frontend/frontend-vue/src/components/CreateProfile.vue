<template>
    <div class="prose dark:prose-invert">
      <h2>Welcome New User!</h2>
      <p>Please Fill out Your Contact Information.</p>
    </div>
    <FormKit
  
    @submit="submitHandler"
      type="form"
      :config="{
        validationVisibility: 'blur'
      }"
     
      submit-label="Update My Contact Information"
    >
        <FormKit type="text" name="firstName" label="First Name" validation="required" />
        <FormKit type="text" name="lastName" label="Last Name" validation="required" />
        <FormKit
          type="select"
          label="How Do You Like To Contacted"
          id="contactChannel"
          name="contactChannel"
          :options="contactChannels"
          :select-icon="null"
          validation="required"
          help="Tell use best how to contact you."
          
        >
       
        </FormKit>
        
        <FormKit
          :validation-rules="{ hasEmailContactMechanism }"
          validation="+hasEmailContactMechanism|email"
          id="emailAddress"
          placeholder="joe@aol.com"
          type="text"
          name="emailAddress"
          label="Email Address"
          :validation-messages="{
            hasEmailContactMechanism: 'You want to be contacted by email. Give us an address, please'
          }"
        />
        <FormKit
          :validation-rules="{ hasPhoneContactMechanism }"
          validation="+hasPhoneContactMechanism"
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          label="Phone Number"
         
          :validation-messages="{
            hasPhoneContactMechanism:
              'You want to be contacted by phone. Give us a phone number, please'
          }"
        />
  
    </FormKit>
  
  
  
  </template>
  <script setup lang="ts">

  import { useAuthQuery } from '@/components/api/auth';
import { useGetContact, type Contact } from '@/components/api/contact';
import { useMutation } from '@tanstack/vue-query';
import { effect } from 'vue';
import { useRouter } from 'vue-router';
const {refetch, data:contact} = useGetContact();
  const router = useRouter()
  const {data} = useAuthQuery();
  const { mutate, isSuccess} = useMutation({
    mutationFn: (values: Contact) => {
      return fetch(`/api/users/${data.value?.id}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
    }
  })
  
  effect(() =>{
    if(contact.value) {
      router.replace({name: 'home'});
    }

  })
  effect(() => {
    console.log(isSuccess.value);
    if(isSuccess.value) {
        console.log('pushing');
        refetch();
        router.replace({name: 'home'});
    }
  })
  
  // const {isLoading, data:contact} = useGetContact();
  
  
  const contactChannels = [
    {
      label: 'Select One',
      value: undefined
    },
    {
      label: 'Email',
      value: 'emailAddress'
    },
    {
      label: 'Phone',
      value: 'phoneNumber'
    }
  ]
  function submitHandler(val:Contact) {
     mutate(val);
  }
  
  function hasEmailContactMechanism(node: any) {
    const parent = node.at('$parent')
    if (parent?.value) {
      if (parent.value.contactChannel === 'emailAddress') {
        return parent.value?.emailAddress || '' !== ''
      }
    }
    return true
  }
  function hasPhoneContactMechanism(node: any) {
    const parent = node.at('$parent')
    if (parent.value.contactChannel === 'phoneNumber') {
      return parent.value?.phoneNumber || '' !== ''
    }
    return true
  }
  </script>
  
  <style>
   .formkit-help {
      @apply label label-text-alt
  }
  </style>