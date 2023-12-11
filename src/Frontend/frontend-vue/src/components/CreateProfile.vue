<template>

  <div vi-if="showForm">
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
        validation="email|+hasEmailContactMechanism"
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
        validation="hasPhoneContactMechanism"
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
  </div>
</template>
<script setup lang="ts">
import { useAuthQuery } from '@/components/api/auth'
import { useGetContact, type Contact } from '@/components/api/contact'
import { useMutation } from '@tanstack/vue-query'
import { effect, ref } from 'vue'
import { useRouter } from 'vue-router'
const { data: contact } = useGetContact()
const showForm = ref(false);
const router = useRouter()
const { data } = useAuthQuery()
const { mutate, isSuccess } = useMutation({
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

effect(() => {
  if (contact.value || isSuccess.value) {
    router.replace({ name: 'home' })
    
  } else {
    showForm.value = true;
  }
})
// effect(() => {
//   if (isSuccess.value) {
//     router.replace({ name: 'home' })
//   }
// })

const contactChannels = [
  {
    label: 'Select One',
    value: undefined
  },
  {
    label: 'Email',
    value: 'EmailAddress'
  },
  {
    label: 'Phone',
    value: 'PhoneNumber'
  }
]
function submitHandler(val: Contact) {
  mutate(val)
}

function hasEmailContactMechanism(node: any) {
  const parent = node.at('$parent')
  if (parent?.value) {
    if (parent.value.contactChannel === 'EmailAddress') {
      return parent.value?.emailAddress || '' !== ''
    }
  }
  return true
}
function hasPhoneContactMechanism(node: any) {
  const parent = node.at('$parent')
  if (parent.value.contactChannel === 'PhoneNumber') {
    return parent.value?.phoneNumber || '' !== ''
  }
  return true
}
</script>

<style>
.formkit-help {
  @apply label label-text-alt;
}
</style>
