<script setup>
import { ref, onMounted } from 'vue';
import api from "@/services/api.js";

const customerList = ref();

onMounted(async () => {
  try {
    const response = await api.get("/customer");
    customerList.value = response.data;
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
    </CTableRow>
  </CTableHead>
  <CTableBody v-for="customer in customerList" v-bind:key="customer.id">
    <CTableRow>
      {{ console.log(customer) }}
      <CTableDataCell>{{ customer.id }}</CTableDataCell>
      <CTableDataCell>{{ customer.name }}</CTableDataCell>
      <CTableDataCell>{{ customer.cpf }}</CTableDataCell>
      <CTableDataCell>{{ customer.email }}</CTableDataCell>
      <CTableDataCell>{{ customer.bornDate }}</CTableDataCell>
    </CTableRow>

  </CTableBody>
</CTable>
</template>
