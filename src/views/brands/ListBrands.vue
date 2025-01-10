<script setup>
import { onMounted, ref } from 'vue';
import api from '@/services/api';
import BrandListItem from '../../components/brands/BrandListItem.vue';
import CIcon from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';

const brandList = ref([]);
onMounted(async () => {
  try {
    const { data } = await api.get('/brand');
    brandList.value = data;
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <CAlert color="warning" v-if="brandList.length === 0" class="text-center">
    Não existem registros. Adicione novas marcas para que elas apareçam aqui.
  </CAlert>

  <div v-else>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
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
    <div class="row g-3">
      <div
        v-for="brand in brandList"
        :key="brand.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <BrandListItem :brand="brand" />
      </div>
    </div>
  </div>
</template>
