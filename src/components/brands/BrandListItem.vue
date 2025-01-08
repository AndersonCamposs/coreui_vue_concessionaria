<script setup>
const BASE_URL = import.meta.env.VITE_API_URL;
const props = defineProps({
  brand: {
    required: true,
  },
});
</script>
<template>
  <CCard>
    <CCardImage :src="BASE_URL + props.brand.image" alt="Brand Image" class="p-3 h-50" />
    <CCardBody>
      <h5 class="text-center">{{ props.brand.name }}</h5>
      <CButton color="primary" class="w-100 mt-2">Editar</CButton>
    </CCardBody>
  </CCard>
</template>
