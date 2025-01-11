<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { defineProps, defineEmits } from 'vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  brand: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CCard class="h-100">
    <CCardImage
      :src="BASE_URL + '/' + brand.image"
      alt="Brand Image"
      class="p-3"
      style="height: 150px; object-fit: contain"
    />
    <CCardBody>
      <h5 class="text-center">{{ brand.name }}</h5>
      <CButton color="primary" class="w-100 mt-2">
        <router-link
          :to="{ name: 'BrandAddEdit', params: { id: brand.id } }"
          class="text-white text-decoration-none d-flex align-items-center justify-content-center"
        >
          Editar
        </router-link>
      </CButton>
    </CCardBody>
  </CCard>
</template>

<style scoped>
.brand-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
