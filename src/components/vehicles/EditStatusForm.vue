<script setup lang="ts">
import { cilClipboard } from '@coreui/icons';
import { CButton, CForm } from '@coreui/vue';
import { ref } from 'vue';
import api from '../../services/api.js';

const emit = defineEmits(['hasError']);

const plate = ref('');
const vehicle = ref({});

const onSearch = async () => {
  try {
    const { data } = await api.get(`/vehicle/search?plate=${plate.value}`);
    vehicle.value = data;
  } catch (e) {
    emit('hasError', e.response.data.message);
  }
};
</script>

<template>
  <CForm>
    <div class="row mb-3">
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
  </CForm>
</template>
