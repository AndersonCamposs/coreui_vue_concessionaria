<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { defineProps, defineEmits } from 'vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  brand: {
    required: true,
  },
});
</script>
<template>
  <CCard>
    <CCardImage :src="BASE_URL + '/' + brand.image" alt="Brand Image" class="p-3 h-50" />
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
