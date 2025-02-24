<script setup>
import { cilCalendar, cilSettings, cilSpeedometer } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CCarousel, CCarouselItem } from '@coreui/vue';
import { defineProps } from 'vue';
import numberFormatter from '@/utils/numberFormatter.js';
const BASE_URL = import.meta.env.VITE_API_URL;

const statusOptions = {
  AVAILABLE: 'Disponível',
  MAINTENANCE: 'Manutenção',
  SOLD: 'Vendido',
};

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
      <h5>
        {{ `${vehicle.brand.name} ${vehicle.model.toUpperCase()}` }}
        <span v-if="vehicle.status != 'AVAILABLE'" class="text-warning">
          ({{ statusOptions[vehicle.status] }})
        </span>
      </h5>
      <p class="mt-4">
        <strong>R$ {{ numberFormatter(vehicle.value) }}</strong>
      </p>
      <hr />
      <div class="d-flex justify-content-between">
        <p><CIcon :icon="cilSpeedometer" /> {{ numberFormatter(vehicle.odometerValue) }}</p>
        <p><CIcon :icon="cilSettings" /> {{ vehicle.transmissionType }}</p>
        <p><CIcon :icon="cilCalendar" /> {{ vehicle.year }}</p>
      </div>

      <CButton color="primary" class="w-100 mt-2">
        <router-link
          :to="{ name: 'VehicleDetails', params: { id: vehicle.id } }"
          class="text-white text-decoration-none d-flex align-items-center justify-content-center"
        >
          Detalhes
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
