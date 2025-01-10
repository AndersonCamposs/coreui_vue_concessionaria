<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api.js';
import { cilSearch } from '@coreui/icons';
import CustomerTable from '../../components/customers/CustomerTable.vue';

const customerList = ref([]);
const searchValue = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/customer');
    customerList.value = response.data;
  } catch (e) {
    console.log(e.message);
  }
});

watch(searchValue, async (newSearchValue) => {
  try {
    let response;
    if (!newSearchValue) {
      response = await api.get('/customer');
    } else {
      response = await api.get(`/customer/search?name=${encodeURIComponent(newSearchValue)}`);
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
          v-model="searchValue"
        />
      </CInputGroup>
    </div>
  </div>
  <CustomerTable :customerList="customerList" />
</template>
