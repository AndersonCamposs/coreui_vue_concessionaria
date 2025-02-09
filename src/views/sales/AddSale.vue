<script setup>
import { cilListNumbered, cilTag } from '@coreui/icons';
import { reactive, ref } from 'vue';
import _ from 'lodash';
import api from '@/services/api.js';
import cpfFormatter from '@/utils/cpfFormatter.js';

const customerCpf = ref('');
const vehiclePlate = ref('');

const customer = reactive({
  id: '',
  name: '',
  cpf: '',
  email: '',
  bornDate: '',
});

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
  color: '',
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

const fetchCustomer = async () => {
  try {
    const { data } = await api.get(`/customer/search?cpf=${customerCpf.value}`);
    loadCustomerData(data);
  } catch (e) {
    console.log(e);
  }
};

const fetchVehicle = async () => {
  try {
    const { data } = await api.get(`/vehicle/search?plate=${vehiclePlate.value}`);
    loadVehicleData(data);
  } catch (e) {
    console.log(e);
  }
};

const loadCustomerData = (data) => {
  Object.assign(customer, data);
};

const loadVehicleData = (data) => {
  _.merge(vehicle, data);
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
  <div v-if="customer.id">
    <div class="row">
      <div class="col-12">
        <h5>
          Qual veículo o cliente
          <span class="text-primary">{{ customer.name }}({{ customer.cpf }})</span> irá comprar
          hoje?
        </h5>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilTag" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Placa do veículo"
            aria-label="Placa do veículo"
            aria-describedby="basic-addon1"
            v-model="vehiclePlate"
          />
        </CInputGroup>
      </div>
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CButton color="secondary" @click="fetchVehicle()">Buscar</CButton>
      </div>
    </div>
  </div>
</template>
