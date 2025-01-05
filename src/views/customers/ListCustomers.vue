<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api.js'
import CustomerRow from '@/components/customers/CustomerRow.vue'

const customerList = ref()

onMounted(async () => {
  try {
    const response = await api.get('/customer')
    customerList.value = response.data
  } catch (e) {
    console.log(e.message)
  }
})
</script>

<template>
  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">ID</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
        <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
        <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
        <CTableHeaderCell scope="col">Data de Nascimento</CTableHeaderCell>
        <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody v-for="customer in customerList" v-bind:key="customer.id">
      <CustomerRow :customer="customer" />
    </CTableBody>
  </CTable>
</template>
