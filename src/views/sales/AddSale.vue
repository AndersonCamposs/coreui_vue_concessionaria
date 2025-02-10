<script setup>
import { cilListNumbered, cilTag } from '@coreui/icons';
import { reactive, ref } from 'vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import _ from 'lodash';
import api from '@/services/api.js';
import cpfFormatter from '@/utils/cpfFormatter.js';
import numberFormatter from '@/utils/numberFormatter.js';
import ConfirmPasswordModal from '../../components/ConfirmPasswordModal.vue';
import { useRouter } from 'vue-router';
import SuccessMessage from '../../components/SuccessMessage.vue';

const showConfirmationModal = ref(false);
const hasSuccess = ref('');
const hasError = ref(false);
const errorMessage = ref('');

const customerCpf = ref('');
const vehiclePlate = ref('');

const router = useRouter();

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
    const { message } = e.response.data;
    showError(message);
  }
};

const fetchVehicle = async () => {
  try {
    const { data } = await api.get(`/vehicle/search?plate=${vehiclePlate.value}`);
    if (data.status === 'SOLD') {
      throw new Error('Ops! Este veículo está indisponível para venda.');
    }
    loadVehicleData(data);
  } catch (e) {
    let message;
    if (e.response) {
      // if error was throwable by Axios
      message = e.response.data.message;
    } else {
      message = e.message;
    }

    showError(message);
  }
};

const loadCustomerData = (data) => {
  Object.assign(customer, data);
};

const loadVehicleData = (data) => {
  _.merge(vehicle, data);
};

const resetVehicleData = () => {
  clearReactiveObject(vehicle);
};

const clearReactiveObject = (object) => {
  for (const key in object) {
    if (Array.isArray(object[key])) {
      object[key] = [];
    } else if (typeof object[key] === 'object' && object[key] != null) {
      clearReactiveObject(object[key]);
    } else {
      object[key] = '';
    }
  }
};

const checkUserPassword = async (password) => {
  showConfirmationModal.value = false;
  try {
    const { data } = await api.post(`/auth/verify-password?password=${password}`);
    if (data) {
      await registerSale();
    }
  } catch (e) {
    const { message } = e.response.data;
    showError(message);
  }
};

const registerSale = async () => {
  try {
    const json = {
      customer: {
        id: customer.id,
      },
      vehicle: {
        id: vehicle.id,
      },
    };

    const { data } = await api.post('/sale', JSON.stringify(json));
    handleSuccess();
  } catch (e) {
    const { message } = e.response.data;
    showError(message);
  }
};

const formatCpf = (event) => {
  const newValue = cpfFormatter(event.target.value);

  event.target.value = newValue;
};

const showError = (message) => {
  errorMessage.value = message;
  hasError.value = true;
  setTimeout(() => {
    hasError.value = false;
    errorMessage.value = '';
  }, 5000);
};

const handleSuccess = () => {
  displaySuccessMessage(() => {
    router.push({ name: 'SaleList' });
  });
};

const displaySuccessMessage = (callback) => {
  hasSuccess.value = true;
  setTimeout(() => {
    hasSuccess.value = false;
    if (callback) callback();
  }, 3000);
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
    <CAlert color="warning" class="text-center" v-if="!hasError">
      Busque pelo cliente para realizar a venda
    </CAlert>
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
    <div v-if="!vehicle.id">
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
      <CAlert color="warning" class="text-center" v-if="!hasError">
        Busque pelo veículo a ser vendido
      </CAlert>
    </div>
    <div v-if="vehicle.id">
      <h5>
        Ótima escolha, o veículo a ser comprado é:
        <span class="text-primary">{{ vehicle.brand.name }} {{ vehicle.model }}, </span>
        ano <span class="text-primary">{{ vehicle.year }}</span> e placa
        <span class="text-primary">{{ vehicle.plate }}</span
        >, no valor de <span class="text-primary">R$ {{ numberFormatter(vehicle.value) }}</span
        >.
      </h5>
      <hr />
      <div class="row">
        <div class="container text-center">
          <CButton color="primary" class="m-3" @click="showConfirmationModal = true"
            >Confirmar venda</CButton
          >
          <CButton color="secondary" class="m-3" @click="resetVehicleData()">
            Não era este veículo? Escolha novamente.
          </CButton>
        </div>
      </div>
    </div>
  </div>

  <ErrorMessage :message="errorMessage" v-if="hasError" />
  <SuccessMessage
    :message="'Venda realizada com sucesso, você será redirecionado'"
    v-if="hasSuccess"
  />
  <ConfirmPasswordModal
    :visible="showConfirmationModal"
    @close="showConfirmationModal = false"
    @confirm="(userPassword) => checkUserPassword(userPassword)"
  />
</template>
