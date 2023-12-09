<template>
  <h1>Profile Here</h1>

  <div class="flex flex-col gap-4 w-52" v-if="isLoading">
  <div class="flex gap-4 items-center">
    
    <div class="flex flex-col gap-4">
      <div class="skeleton h-4 w-20"></div>
      <div class="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>

</div>
  
  <div v-if="contact" >

  <FormKit

  @submit="submitHandler"
    type="form"
    :config="{
      validationVisibility: 'blur'
    }"
    :value="contact"
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
</div>


</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useAuthQuery } from '../components/api/auth';
import { getContact, type Contact} from '../components/api/contact';

const { data } = useAuthQuery();

const userId = data.value?.id;

const {isLoading, isError, data:contact} = useQuery<Contact>({
  queryKey: ['user', 'contact'],
  queryFn: () => getContact(userId!),
  enabled: !!userId


})



// const contact:Contact = {
//     firstName: 'Jeff',
//     lastName: 'Gonzalez',
//     contactChannel: 'emailAddress',
//     emailAddress: 'jeff@aol.com',
//     phoneNumber: ''
// }
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
    console.log('submitted', val);
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