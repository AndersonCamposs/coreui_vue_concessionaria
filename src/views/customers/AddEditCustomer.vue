<script setup>
import { ref, onMounted, onUpdated, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cilPencil, cilListNumbered, cilAt, cilCalendar } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import {
  CButton,
  CForm,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/vue';
import api from '@/services/api.js';

const router = useRouter();
const route = useRoute();
const modalVisible = ref(false);

const customerId = ref(route.params.id || null);
const name = ref('');
const cpf = ref('');
const email = ref('');
const bornDate = ref('');

const formatcpf = () => {
  let inputLength = cpf.value.length;
  if (inputLength === 3) {
    cpf.value = cpf.value + '.';
  } else if (inputLength === 7) {
    cpf.value = cpf.value + '.';
  } else if (inputLength === 11) {
    cpf.value = cpf.value + '-';
  }
};

const onSubmit = async () => {
  try {
    const data = {
      name: name.value,
      cpf: cpf.value,
      email: email.value,
      bornDate: bornDate.value,
    };

    if (customerId.value) {
      const response = await api.put(`/customer/${customerId.value}`, data);
      alert('Cliente atualizado com sucesso.');
      console.log(response);
    } else {
      const response = await api.post('/customer', data);
      alert('Cliente cadastrado com sucesso.');
      console.log(response);
    }

    router.push({ name: 'CustomerList' });
  } catch (e) {
    console.log(e);
  }
};

const loadCustomerData = async (newId) => {
  if (customerId.value) {
    try {
      const response = await api.get(`/customer/${newId}`);
      fillFields(response.data);
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
  name.value = data.name;
  cpf.value = data.cpf;
  email.value = data.email;
  bornDate.value = data.bornDate;
};

const clearFields = () => {
  name.value = '';
  cpf.value = '';
  email.value = '';
  bornDate.value = '';
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
      <CForm @submit.prevent="onSubmit">
        <div class="row mb-3">
          <div class="col-8">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilPencil" /></CInputGroupText>
              <CFormInput
                type="text"
                required
                placeholder="Nome"
                aria-label="Nome"
                aria-describedby="basic-addon1"
                v-model="name"
              />
            </CInputGroup>
          </div>

          <div class="col-4">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilListNumbered" /></CInputGroupText>
              <CFormInput
                type="text"
                required
                placeholder="CPF"
                aria-label="CPF"
                aria-describedby="basic-addon1"
                maxlength="14"
                @keydown="formatcpf"
                v-model="cpf"
              />
            </CInputGroup>
          </div>

          <div class="col-8">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilAt" /></CInputGroupText>
              <CFormInput
                type="email"
                required
                placeholder="E-mail"
                aria-label="E-mail"
                aria-describedby="basic-addon1"
                v-model="email"
              />
            </CInputGroup>
          </div>

          <div class="col-4">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilCalendar" /></CInputGroupText>
              <CFormInput
                type="date"
                required
                placeholder="Data de nascimento"
                aria-label="Data de nascimento"
                aria-describedby="basic-addon1"
                v-model="bornDate"
              />
            </CInputGroup>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <CButton color="primary" type="submit" class="me-4">
              {{ customerId ? 'Atualizar' : 'Salvar' }}
            </CButton>
            <CButton
              v-if="customerId"
              color="danger"
              class="me-4"
              @click="
                () => {
                  modalVisible = true;
                }
              "
              >Deletar</CButton
            >
          </div>
        </div>
      </CForm>
      <CModal
        :visible="modalVisible"
        @close="
          () => {
            modalVisible = false;
          }
        "
        aria-labelledby="Modal de exclusão"
      >
        <CModalHeader>
          <CModalTitle>Confirmação de exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza que deseja excluir o cliente
          <strong>{{ name }}</strong>
          ,de CPF: <strong>{{ cpf }}</strong
          >?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            @click="
              () => {
                modalVisible = false;
              }
            "
          >
            Fechar
          </CButton>
          <CButton color="primary" @click="deleteCustomer">Confirmar</CButton>
        </CModalFooter>
      </CModal>
    </CCardBody>
  </CCard>
</template>
