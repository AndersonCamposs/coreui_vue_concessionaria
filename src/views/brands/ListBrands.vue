<script setup>
import { onMounted, ref } from 'vue';
import api from '@/services/api';
import BrandListItem from '../../components/brands/BrandListItem.vue';

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
  <div class="row g-3" v-else>
    <div v-for="brand in brandList" :key="brand.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <BrandListItem :brand="brand" />
    </div>
  </div>
</template>
