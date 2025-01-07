<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cilPencil, cilListNumbered, cilAt, cilCalendar } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CInputGroup } from '@coreui/vue';
import api from '@/services/api.js';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue';
import CustomerForm from '../../components/customers/CustomerForm.vue';

const error = ref(false);
const errorMessage = ref('');

const router = useRouter();
const route = useRoute();
const modalVisible = ref(false);

const customerId = ref(route.params.id || null);
const customer = reactive({
  id: '',
  name: '',
  cpf: '',
  email: '',
  bornDate: '',
});
const name = ref('');
const cpf = ref('');
const email = ref('');
const bornDate = ref('');

const formatcpf = (event) => {
  let value = event.target.value;

  value = value.replace(/\D/g, '');

  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');

  event.target.value = value;
};

const onSubmit = async () => {
  try {
    if (customerId.value) {
      const response = await api.put(`/customer/${customerId.value}`, customer);
      alert('Cliente atualizado com sucesso.');
      console.log(response);
    } else {
      const response = await api.post('/customer', customer);
      alert('Cliente cadastrado com sucesso.');
      console.log(response);
    }

    router.push({ name: 'CustomerList' });
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

const deleteCustomer = async () => {
  if (customerId.value) {
    try {
      const response = await api.delete(`/customer/${customerId.value}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  router.push({ name: 'CustomerList' });
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
  }, 3000);
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
        @show-delete-modal="modalVisible = true"
        @on-submit="onSubmit"
      />
      <ConfirmDeleteModal
        :visible="modalVisible"
        @confirm="deleteCustomer"
        @close="modalVisible = false"
      />
      <ErrorMessage :message="errorMessage" v-if="error" />
    </CCardBody>
  </CCard>
</template>
