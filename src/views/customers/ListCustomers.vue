<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api.js';
import { cilLoopCircular, cilSearch } from '@coreui/icons';
import CustomerTable from '../../components/customers/CustomerTable.vue';
import { CButton } from '@coreui/vue';

const customerList = ref([]);
const searchValue = ref('');

const onSearch = async () => {
  try {
    const response = await api.get(
      `/customer/search?name=${encodeURIComponent(searchValue.value)}`,
    );

    customerList.value = response.data;
  } catch (e) {
    console.log(e.message);
  }
};

const onReset = async () => {
  try {
    const response = await api.get('/customer');
    customerList.value = response.data;
    searchValue.value = '';
  } catch (e) {
    console.log(e.message);
  }
};
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
    <div class="col-12 col-md-8 col-lg-4 mb-3">
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
    <div class="col-6 col-md-2 col-lg-1 mb-3">
      <CButton color="primary" @click="onSearch">Buscar</CButton>
    </div>
    <div class="col-2 col-md-2 col-lg-1 mb-3">
      <CButton color="warning" @click="onReset"><CIcon :icon="cilLoopCircular" /></CButton>
    </div>
  </div>
  <CustomerTable :customerList="customerList" />
</template>
