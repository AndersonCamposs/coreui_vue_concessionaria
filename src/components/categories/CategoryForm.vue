<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import { cilPencil, cilListNumbered, cilAt, cilCalendar } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CFormTextarea, CInputGroup } from '@coreui/vue';

const emit = defineEmits(['showDeleteModal', 'onSubmit']);
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CForm @submit.prevent="emit('onSubmit')">
    <div class="row mb-3">
      <div class="col-12 col-lg-8 col-md-8 col-sm-8">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"><CIcon :icon="cilPencil" /></CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Nome"
            aria-label="Nome"
            aria-describedby="basic-addon1"
            v-model="category.name"
          />
        </CInputGroup>
      </div>

      <div class="col-12 col-lg-8 col-md-8 col-sm-8">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"><CIcon :icon="cilListNumbered" /></CInputGroupText>

          <CFormTextarea rows="2" placeholder="Descrição..." v-model="category.description" />
        </CInputGroup>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <CButton color="primary" type="submit" class="me-4">
          {{ category.id ? 'Atualizar' : 'Salvar' }}
        </CButton>
        <CButton v-if="category.id" color="danger" class="me-4" @click="$emit('showDeleteModal')"
          >Deletar</CButton
        >
      </div>
    </div>
  </CForm>
</template>
