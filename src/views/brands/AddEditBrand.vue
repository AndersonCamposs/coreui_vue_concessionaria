<script setup>
import api from '@/services/api.js';
import { CCard, CCardBody, CCardHeader } from '@coreui/vue';
import BrandForm from '@/components/brands/BrandForm.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PreviewImageModal from '@/components/PreviewImageModal.vue';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const error = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();

const brandId = ref(route.params.id || null);
const brand = reactive({
  id: '',
  name: '',
  image: '',
});
const imageModalVisible = ref(false);
const deleteModalVisible = ref(false);

const onSubmit = async (file) => {
  const formData = new FormData();
  try {
    formData.append('name', brand.name);
    formData.append('file', file);

    if (brand.id) {
      const { data } = await api.put(`/brand/${brandId.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Marca atualizada com sucesso');
      console.log(data);
    } else {
      const { data } = await api.post('/brand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Marca cadastrada com sucesso.');
      console.log(data);
    }
    router.push({ name: 'BrandList' });
  } catch (e) {
    const { data } = e.response;
    let message = data.message;
    for (const error of data.errors) {
      message += `\n ${error}`;
    }
    showError(message);
  }
};

const onDelete = async () => {
  if (brandId.value) {
    try {
      const { data } = api.delete(`/brand/${brandId.value}`);
      router.push({ name: 'BrandList' });
    } catch (e) {
      console.log(e);
    }
  }
};

const loadBrandData = async (newId) => {
  if (brandId.value) {
    try {
      const { data } = await api.get(`/brand/${newId}`);
      fillFields(data);
    } catch (e) {
      console.log(e.message);
    }
  }
};

const fillFields = (data) => {
  brand.id = data.id;
  brand.name = data.name;
  brand.image = data.image;
};

const clearFields = () => {
  brand.id = '';
  brand.name = '';
  brand.image = '';
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
    brandId.value = newId || null;
    if (!newId) {
      clearFields();
    } else {
      loadBrandData(newId);
    }
  },
  { immediate: true },
);
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar marca</strong> <small>Preencha os dados da marca</small>
    </CCardHeader>
    <CCardBody>
      <BrandForm
        :brand="brand"
        @on-submit="(file) => onSubmit(file)"
        @show-image-modal="imageModalVisible = true"
        @show-delete-modal="deleteModalVisible = true"
      />
      <PreviewImageModal
        :imageUrl="brand.image"
        :visible="imageModalVisible"
        @close="imageModalVisible = false"
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
