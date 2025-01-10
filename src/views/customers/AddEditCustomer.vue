<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import CustomerForm from '../../components/customers/CustomerForm.vue';

const error = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const deleteModalVisible = ref(false);

const customerId = ref(route.params.id || null);
const customer = reactive({
  id: '',
  name: '',
  cpf: '',
  email: '',
  bornDate: '',
});

const onSubmit = async () => {
  try {
    if (customerId.value) {
      const response = await api.put(`/customer/${customerId.value}`, customer);
      alert('Cliente atualizado com sucesso.');
      console.log(response);
      router.push({ name: 'CustomerList' });
    } else {
      const response = await api.post('/customer', customer);
      alert('Cliente cadastrado com sucesso.');
      console.log(response);
    }
  } catch (e) {
    const message = e.response.data.errors[0];
    showError(message);
  }
};

const loadCustomerData = async (newId) => {
  if (customerId.value) {
    try {
      const { data } = await api.get(`/customer/${newId}`);
      fillFields(data);
    } catch (e) {
      console.log(e.message);
    }
  }
};

const onDelete = async () => {
  if (customerId.value) {
    try {
      const response = await api.delete(`/customer/${customerId.value}`);
      router.push({ name: 'CustomerList' });
    } catch (e) {
      console.log(e.message);
    }
  }
};

const fillFields = (data) => {
  customer.id = data.id;
  customer.name = data.name;
  customer.cpf = data.cpf;
  customer.email = data.email;
  customer.bornDate = data.bornDate;
};

const clearFields = () => {
  customer.id = '';
  customer.name = '';
  customer.cpf = '';
  customer.email = '';
  customer.bornDate = '';
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
    customerId.value = newId || null;
    if (!newId) {
      clearFields();
    } else {
      loadCustomerData(newId);
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
      <CustomerForm
        :customer="customer"
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
