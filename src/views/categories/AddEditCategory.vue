<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import CustomerForm from '@/components/categories/CategoryForm.vue';

const error = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const deleteModalVisible = ref(false);

const categoryId = ref(route.params.id || null);
const category = reactive({
  id: '',
  name: '',
  description: '',
});

const onSubmit = async () => {
  try {
    if (categoryId.value) {
      const response = await api.put(`/category/${categoryId.value}`, category);
      alert('Categoria atualizada com sucesso.');
      console.log(response);
    } else {
      const response = await api.post('/category', category);
      alert('Categoria cadastrada com sucesso.');
      console.log(response);
    }
    router.push({ name: 'CategoryList' });
  } catch (e) {
    const message = e.response.data.errors[0];
    showError(message);
  }
};

const loadCategoryData = async (newId) => {
  if (categoryId.value) {
    try {
      const { data } = await api.get(`/category/${newId}`);
      fillFields(data);
    } catch (e) {
      console.log(e.message);
    }
  }
};

const onDelete = async () => {
  if (categoryId.value) {
    try {
      const response = await api.delete(`/category/${categoryId.value}`);
      router.push({ name: 'CustomerList' });
    } catch (e) {
      console.log(e.message);
    }
  }
};

const fillFields = (data) => {
  category.id = data.id;
  category.name = data.name;
  category.description = data.description;
};

const clearFields = () => {
  category.id = '';
  category.name = '';
  category.description = '';
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
    categoryId.value = newId || null;
    if (!newId) {
      clearFields();
    } else {
      loadCategoryData(newId);
    }
  },
  { immediate: true },
);
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar categoria</strong> <small>Preencha os dados da categoria</small>
    </CCardHeader>
    <CCardBody>
      <CustomerForm
        :category="category"
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
