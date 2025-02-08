<script setup>
import { defineProps, defineEmits } from 'vue';
import { cilPencil, cilListNumbered, cilAt, cilCalendar } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CInputGroup } from '@coreui/vue';
import cpfFormatter from '@/utils/cpfFormatter.js';

const emit = defineEmits(['showDeleteModal', 'onSubmit']);
const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
});

const formatCpf = (event) => {
  const newValue = cpfFormatter(event.target.value);

  event.target.value = newValue;
};
</script>

<template>
  <CForm @submit.prevent="emit('onSubmit')">
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
            v-model="customer.name"
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
            @input="(event) => formatCpf(event)"
            v-model="customer.cpf"
            :disabled="customer.id != ''"
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
            v-model="customer.email"
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
            v-model="customer.bornDate"
            :disabled="customer.id != ''"
          />
        </CInputGroup>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <CButton color="primary" type="submit" class="me-4">
          {{ customer.id ? 'Atualizar' : 'Salvar' }}
        </CButton>
        <CButton v-if="customer.id" color="danger" class="me-4" @click="$emit('showDeleteModal')"
          >Deletar</CButton
        >
      </div>
    </div>
  </CForm>
</template>
