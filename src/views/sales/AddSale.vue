<script setup>
import { cilListNumbered } from '@coreui/icons';
import { reactive, ref } from 'vue';
import api from '@/services/api.js';
import cpfFormatter from '@/utils/cpfFormatter.js';

const customerCpf = ref('');

const customer = reactive({
  id: '',
  name: '',
  cpf: '',
  email: '',
  bornDate: '',
});

const fetchCustomer = async () => {
  try {
    const { data } = await api.get(`/customer/search?cpf=${customerCpf.value}`);
    loadCustomerData(data);
  } catch (e) {
    console.log(e);
  }
};

const loadCustomerData = (data) => {
  Object.assign(customer, data);
};

const formatCpf = (event) => {
  const newValue = cpfFormatter(event.target.value);

  event.target.value = newValue;
};
</script>

<template>
  <div class="container" v-if="!customer.id">
    <div class="row mb-1">
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilListNumbered" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="CPF do cliente"
            aria-label="CPF do cliente"
            aria-describedby="basic-addon1"
            maxlength="14"
            @input="(event) => formatCpf(event)"
            v-model="customerCpf"
          />
        </CInputGroup>
      </div>
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CButton color="secondary" @click="fetchCustomer()">Buscar</CButton>
      </div>
    </div>
    <CAlert color="warning" class="text-center"> Busque pelo cliente para realizar a venda </CAlert>
  </div>
</template>
