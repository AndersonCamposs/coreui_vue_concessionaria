<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api.js';
import { cilLoopCircular, cilSearch } from '@coreui/icons';
import CategoryTable from '@/components/categories/CategoryTable.vue';
import { CButton } from '@coreui/vue';

const categoryList = ref([]);
const searchValue = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/category');
    categoryList.value = response.data;
  } catch (e) {
    console.log(e.message);
  }
});

watch(searchValue, async (newSearchValue) => {
  try {
    let response;
    if (!newSearchValue) {
      response = await api.get('/category');
    } else {
      response = await api.get(`/category/search?name=${encodeURIComponent(newSearchValue)}`);
    }
    categoryList.value = response.data;
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
  </div>
  <CategoryTable :categoryList="categoryList" />
</template>
