<script setup>
import { CButton } from '@coreui/vue';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['showDeleteModal'])
const { customer } = defineProps(['customer']);
</script>

<template>
<CButton v-if="customer.id" @click="$emit('showDeleteModal')">Clique</CButton>

</template>
