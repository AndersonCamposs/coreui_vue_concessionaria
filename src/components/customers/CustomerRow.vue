<script setup>
import { defineProps } from 'vue'

const { customer } = defineProps(['customer'])
</script>

<template>
  <CTableRow>
    <CTableDataCell>{{ customer.id }}</CTableDataCell>
    <CTableDataCell>{{ customer.name }}</CTableDataCell>
    <CTableDataCell>{{ customer.cpf }}</CTableDataCell>
    <CTableDataCell>{{ customer.email }}</CTableDataCell>
    <CTableDataCell>{{ customer.bornDate }}</CTableDataCell>
  </CTableRow>
</template>
