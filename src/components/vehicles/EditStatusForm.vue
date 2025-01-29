<script setup lang="ts">
import { cilClipboard } from '@coreui/icons';
import { CButton, CForm, CFormSelect } from '@coreui/vue';
import { ref } from 'vue';
import api from '../../services/api.js';

const emit = defineEmits(['hasError', 'vehicleFinded', 'onSubmit']);

const plate = ref('');
const status = ref('');
const vehicleWasFinded = ref(false);

const onSearch = async () => {
  try {
    const { data } = await api.get(`/vehicle/search?plate=${plate.value}`);
    vehicleWasFinded.value = true;
    emit('vehicleFinded', data);
  } catch (e) {
    emit('hasError', e.response.data.message);
  }
};
</script>

<template>
  <CForm @submit.prevent="emit('onSubmit', status)">
    <div class="row mb-1">
      <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilClipboard" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Placa do veículo"
            aria-label="Placa do veículo"
            aria-describedby="basic-addon1"
            v-model="plate"
          />
        </CInputGroup>
      </div>
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CButton color="secondary" @click="onSearch">Buscar</CButton>
      </div>
    </div>
    <div class="row mb-3" v-if="vehicleWasFinded">
      <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"> Status </CInputGroupText>
          <CFormSelect v-model="status" required>
            <option value="" disabled selected>Selecione o status</option>
            <option value="AVAILABLE">DISPONÍVEL</option>
            <option value="MAINTENANCE">MANUTENÇÃO</option>
            <option value="SOLD">VENDIDO</option>
          </CFormSelect>
        </CInputGroup>
      </div>
      <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
        <CButton color="primary" type="submit">Atualizar</CButton>
      </div>
    </div>
  </CForm>
</template>
