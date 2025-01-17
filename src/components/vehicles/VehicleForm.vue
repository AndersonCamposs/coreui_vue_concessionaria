<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { cilPencil, cilListNumbered, cilAt, cilCalendar, cilTag } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CFormSelect, CInputGroup } from '@coreui/vue';
import api from '@/services/api.js';

const emit = defineEmits(['showDeleteModal', 'onSubmit']);
const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
const brandsList = ref([]);
const categoriesList = ref([]);

const loadBrandsList = async () => {
  try {
    const { data } = await api.get('/brand');
    brandsList.value = data;
  } catch (e) {
    console.log(e.message);
  }
};

const loadCategoriesList = async () => {
  try {
    const { data } = await api.get('/category');
    categoriesList.value = data;
  } catch (e) {
    console.log(e.message);
  }
};

onMounted(async () => {
  try {
    await loadBrandsList();
    await loadCategoriesList();
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <CForm @submit.prevent="emit('onSubmit')">
    <div class="row mb-3">
      <div class="col-4">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1">
            <CIcon :icon="cilTag" />
          </CInputGroupText>
          <CFormSelect aria-label="Select da marca do veículo">
            <option v-for="brand in brandsList" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </CFormSelect>
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
            v-model="vehicle.cpf"
            :disabled="vehicle.id != ''"
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
            v-model="vehicle.email"
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
            v-model="vehicle.bornDate"
            :disabled="vehicle.id != ''"
          />
        </CInputGroup>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <CButton color="primary" type="submit" class="me-4">
          {{ vehicle.id ? 'Atualizar' : 'Salvar' }}
        </CButton>
        <CButton v-if="vehicle.id" color="danger" class="me-4" @click="$emit('showDeleteModal')"
          >Deletar</CButton
        >
      </div>
    </div>
  </CForm>
</template>
