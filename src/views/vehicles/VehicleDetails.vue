<script setup>
import api from '@/services/api.js';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VehicleCarousel from '@/components/vehicles/VehicleCarousel.vue';
import VehicleSpecifications from '@/components/vehicles/VehicleSpecifications.vue';

const router = useRouter();
const route = useRoute();

const vehicleId = ref(route.params.id);
const vehicle = reactive({
  id: '',
  model: '',
  chassisNumber: '',
  plate: '',
  brand: {},
  year: '',
  color: '',
  category: {},
  transmissionType: '',
  status: '',
  value: '',
  odometerValue: '',
  description: '',
  photos: [],
  sale: {},
});

const loadVehicleData = (data) => {
  for (const key in data) {
    if (Array.isArray(vehicle[key])) {
      // Atualizar arrays de forma reativa
      vehicle[key].splice(0, vehicle[key].length, ...data[key]);
    } else if (typeof vehicle[key] === 'object' && vehicle[key] !== null) {
      // Atualizar objetos aninhados de forma segura
      Object.assign(vehicle[key], data[key]);
    } else {
      // Atualizar valores simples
      vehicle[key] = data[key];
    }
  }
};

onMounted(async () => {
  try {
    const { data } = await api.get(`/vehicle/${vehicleId.value}`);
    loadVehicleData(data);
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <div class="row mx-n3">
    <div
      class="col-12 col-md-12 col-sm-12 col-lg-5 col-xl-5 col-xxl-5 px-3 d-flex align-items-center justify-content-center"
    >
      <VehicleCarousel v-if="vehicle.photos.length > 0" :photos="vehicle.photos" />
    </div>
    <div class="col-12 col-md-12 col-sm-12 col-lg-7 col-xl-7 col-xxl-7 px-3">
      <VehicleSpecifications :vehicle="vehicle" />
    </div>
  </div>
</template>
