<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import VehicleForm from '../../components/vehicles/VehicleForm.vue';

const error = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const deleteModalVisible = ref(false);

const vehicleId = ref(route.params.id || null);
const vehicle = reactive({
  id: '',
  model: '',
  chassisNumber: '',
  plate: '',
  brand: '',
  year: '',
  category: '',
  transmissionType: '',
  status: '',
  value: '',
  odometerValue: '',
  description: '',
  photos: '',
  sale: '',
});

const onSubmit = async () => {
  try {
    if (vehicleId.value) {
      const response = await api.put(`/vehicle/${vehicleId.value}`, vehicle);
      alert('Cliente atualizado com sucesso.');
      console.log(response);
    } else {
      const response = await api.post('/vehicle', vehicle);
      alert('Cliente cadastrado com sucesso.');
      console.log(response);
    }
    router.push({ name: 'VehicleList' });
  } catch (e) {
    const message = e.response.data.errors[0];
    showError(message);
  }
};

const loadVehicleData = async (newId) => {
  if (vehicleId.value) {
    try {
      const { data } = await api.get(`/vehicle/${newId}`);

      fillFields(data);
    } catch (e) {
      console.log(e.message);
    }
  }
};

const onDelete = async () => {
  if (vehicleId.value) {
    try {
      const response = await api.delete(`/vehicle/${vehicleId.value}`);
      router.push({ name: 'VehicleList' });
    } catch (e) {
      console.log(e.message);
    }
  }
};

const fillFields = (data) => {
  vehicle.id = data.id;
  vehicle.name = data.name;
  vehicle.cpf = data.cpf;
  vehicle.email = data.email;
  vehicle.bornDate = data.bornDate;
};

const clearFields = () => {
  vehicle.id = '';
  vehicle.name = '';
  vehicle.cpf = '';
  vehicle.email = '';
  vehicle.bornDate = '';
};

const showError = (message) => {
  errorMessage.value = message;
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
};

watch(
  () => route.params.id,
  (newId) => {
    vehicleId.value = newId || null;
    if (!newId) {
      clearFields();
    } else {
      loadVehicleData(newId);
    }
  },
  { immediate: true },
);
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar cliente</strong> <small>Preencha os dados do cliente</small>
    </CCardHeader>
    <CCardBody>
      <VehicleForm
        :vehicle="vehicle"
        @show-delete-modal="deleteModalVisible = true"
        @on-submit="onSubmit"
      />
      <ConfirmDeleteModal
        :visible="deleteModalVisible"
        @confirm="onDelete"
        @close="deleteModalVisible = false"
      />
      <ErrorMessage :message="errorMessage" v-if="error" />
    </CCardBody>
  </CCard>
</template>
