<script setup>
import EditStatusForm from '@/components/vehicles/EditStatusForm.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { onUpdated, ref } from 'vue';
import api from '../../services/api';
import { useRouter } from 'vue-router';
import SuccessMessage from '../../components/SuccessMessage.vue';

const router = useRouter();

const vehicle = ref(null);
const hasSuccess = ref(false);
const error = ref(false);
const errorMessage = ref('');

const onSubmit = async (newStatus) => {
  try {
    if (vehicle.value) {
      const response = await api.patch(`/vehicle/${vehicle.value.id}`, JSON.stringify(newStatus));
      handleSuccess();
    }
  } catch (e) {
    console.log(e);
  }
};

const loadVehicleData = (foundedVehicle) => {
  vehicle.value = foundedVehicle;
};

const handleSuccess = () => {
  displaySuccessMessage(() => {
    router.push({ name: 'VehicleList' });
  });
};

const displaySuccessMessage = (callback) => {
  hasSuccess.value = true;
  setTimeout(() => {
    hasSuccess.value = false;
    if (callback) callback();
  }, 3000);
};

const showError = (message) => {
  errorMessage.value = message;
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
};
</script>

<template>
  <div class="mb-3">
    <h3 class="text-center">Busque pelo veículo que deseja atualizar</h3>
    <h5 class="text-center text-primary" v-if="vehicle != null">
      {{ `${vehicle.brand.name} ${vehicle.model}(${vehicle.year}) - Placa: ${vehicle.plate}` }}
    </h5>
    <hr />
  </div>
  <EditStatusForm
    @has-error="(message) => showError(message)"
    @vehicle-finded="(foundedVehicle) => loadVehicleData(foundedVehicle)"
    @on-submit="(newStatus) => onSubmit(newStatus)"
  />
  <ErrorMessage :message="errorMessage" v-if="error" />
  <SuccessMessage
    :message="'Status atualizado com sucesso, você será redirecionado'"
    v-if="hasSuccess"
  />
</template>
