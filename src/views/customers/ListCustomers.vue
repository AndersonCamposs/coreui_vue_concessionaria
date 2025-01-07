<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api.js';
import { cilSearch } from '@coreui/icons';
import CustomerTable from '../../components/customers/CustomerTable.vue';

const customerList = ref([]);
const inputSearch = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/customer');
    customerList.value = response.data;
  } catch (e) {
    console.log(e.message);
  }
});

watch(inputSearch, async (newValSearch) => {
  try {
    let response;
    if (!newValSearch) {
      response = await api.get('/customer');
    } else {
      response = await api.get(`/customer/search?name=${encodeURIComponent(newValSearch)}`);
    }
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
          v-model="inputSearch"
        />
      </CInputGroup>
    </div>
  </div>
  <CustomerTable :customerList="customerList" />
</template>
