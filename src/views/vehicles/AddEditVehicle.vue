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
  brand: {
    id: '',
    name: '',
  },
  year: '',
  category: {
    id: '',
    name: '',
    description: '',
  },
  transmissionType: '',
  status: '',
  value: '',
  odometerValue: '',
  description: '',
  photos: [],
  sale: '',
});

const onSubmit = async () => {
  const formData = prepareFormData();
  try {
    if (vehicleId.value) {
      const response = await api.put(`/vehicle/${vehicleId.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Veículo atualizado com sucesso.');
      console.log(response);
    } else {
      const response = await api.post('/vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Veículo cadastrado com sucesso.');
      console.log(response);
    }
    router.push({ name: 'VehicleList' });
  } catch (e) {
    let message;
    if (e.response.data.errors) {
      message = e.response.data.errors[0];
    } else {
      message = e.response.data.message;
    }
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
  vehicle.model = data.model;
  vehicle.chassisNumber = data.chassisNumber;
  vehicle.plate = data.plate;
  vehicle.brand = data.brand;
  vehicle.year = data.year;
  vehicle.category = data.category;
  vehicle.transmissionType = data.transmissionType;
  vehicle.status = data.status;
  vehicle.value = data.value;
  vehicle.odometerValue = data.odometerValue;
  vehicle.description = data.description;
  vehicle.photos = data.photos;
  vehicle.sale = data.sale;
};

const clearFields = () => {
  vehicle.id = '';
  vehicle.model = '';
  vehicle.chassisNumber = '';
  vehicle.plate = '';
  vehicle.brand = {
    id: '',
    name: '',
  };
  vehicle.year = '';
  vehicle.category = {
    id: '',
    name: '',
    description: '',
  };
  vehicle.transmissionType = '';
  vehicle.status = '';
  vehicle.value = '';
  vehicle.odometerValue = '';
  vehicle.description = '';
  vehicle.photos = [];
  vehicle.sale = '';
};

const showError = (message) => {
  errorMessage.value = message;
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
};

const prepareFormData = () => {
  const formData = new FormData();
  /*formData.append(
    'vehicle',
    JSON.stringify({
      model: vehicle.model,
      chassisNumber: vehicle.chassisNumber,
      plate: vehicle.plate,
      brandId: vehicle.brand.id,
      year: vehicle.year,
      categoryId: vehicle.category.id,
      transmissionType: vehicle.transmissionType,
      status: vehicle.status,
      value: vehicle.value,
      odometerValue: vehicle.odometerValue,
    }),
  );*/
  formData.append('model', vehicle.model);
  formData.append('chassisNumber', vehicle.chassisNumber);
  formData.append('plate', vehicle.plate);
  formData.append('brandId', vehicle.brand.id);
  formData.append('year', vehicle.year);
  formData.append('categoryId', vehicle.category.id);
  formData.append('transmissionType', vehicle.transmissionType);
  formData.append('status', vehicle.status);
  formData.append('value', vehicle.value);
  formData.append('odometerValue', vehicle.odometerValue);
  vehicle.photos.forEach((photo) => {
    formData.append('file', photo);
  });

  return formData;
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
        @update-photos="(updatedPhotos) => (vehicle.photos = updatedPhotos)"
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
