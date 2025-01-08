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
  <div class="row gy-4 justify-content-between mx-4" v-else>
    <BrandListItem
      v-for="brand in brandList"
      :key="brand.id"
      :brand="brand"
      class="col-12 col-sm-5 col-md-4"
    />
  </div>
</template>
