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
  <div class="d-flex flex-wrap justify-content-start" style="margin: -0.5rem" v-else>
    <div
      v-for="brand in brandList"
      :key="brand.id"
      class="p-3"
      style="flex: 1 1 calc(33.333% - 1rem); max-width: calc(33.333% - 1rem); margin: 0.5rem"
    >
      <BrandListItem :brand="brand" />
    </div>
  </div>
</template>
