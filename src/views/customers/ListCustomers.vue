<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api.js';
import CustomerRow from '@/components/customers/CustomerRow.vue';
import { CAlert, CTableFoot } from '@coreui/vue';
import { cilSearch } from '@coreui/icons';

const customerList = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/customer');
    customerList.value = response.data;
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <div class="row">
    <div class="col-4">
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1"><CIcon :icon="cilSearch" /></CInputGroupText>
        <CFormInput
          type="text"
          required
          placeholder="Buscar por nome"
          aria-label="Burcar por nome"
          aria-describedby="basic-addon1"
          v-on:input="() => console.log('ok')"
        />
      </CInputGroup>
    </div>
  </div>
  <CAlert color="warning" v-if="customerList.length === 0" class="text-center">
    Não existem registros.
    Adicione novos clientes para que eles apareçam aqui.
  </CAlert>
  <CTable striped v-else>
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
