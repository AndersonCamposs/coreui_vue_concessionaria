<script setup>
import api from '@/services/api.js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VehicleCarousel from '../../components/vehicles/VehicleCarousel.vue';

const router = useRouter();
const route = useRoute();

const vehicleId = ref(route.params.id);
const vehicle = ref({});

onMounted(async () => {
  try {
    const { data } = await api.get(`/vehicle/${vehicleId.value}`);
    vehicle.value = data;
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>OK</template>
