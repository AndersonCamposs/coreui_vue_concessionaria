<script setup>
import api from '@/services/api.js';
import { CCard, CCardBody, CCardHeader } from '@coreui/vue';
import BrandForm from '@/components/brands/BrandForm.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PreviewImageModal from '../../components/PreviewImageModal.vue';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';

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
  try {
    if (brand.id) {
      console.log('update');
    } else {
      console.log('post');
    }
  } catch (e) {
    console.log(e.message);
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
        @confirm="console.log('CONFIRMA')"
        @close="deleteModalVisible = false"
      />
    </CCardBody>
  </CCard>
</template>
