<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CCarousel, CCarouselItem } from '@coreui/vue';
import { defineProps, defineEmits, onMounted } from 'vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CCard class="h-100">
    <CCarousel indicators :interval="3000">
      <CCarouselItem v-for="(photo, index) in vehicle.photos" :key="index" class="p-1">
        <img
          :src="BASE_URL + '/' + photo.path"
          :alt="vehicle.model + 'Image'"
          class="p-3 carousel-image"
        />
      </CCarouselItem>
    </CCarousel>
    <CCardBody>
      <h5>{{ vehicle.brand.name + ' ' + vehicle.model }}</h5>
      <p>{{ vehicle.description }}</p>
      <p class="mt-4">
        <strong>R$ {{ vehicle.value }}</strong>
      </p>
      <hr />

      <CButton color="primary" class="w-100 mt-2">
        <router-link
          :to="{ name: 'VehicleAddEdit', params: { id: vehicle.id } }"
          class="text-white text-decoration-none d-flex align-items-center justify-content-center"
        >
          Editar
        </router-link>
      </CButton>
    </CCardBody>
  </CCard>
</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1.5rem;
  margin: auto;
}
</style>
