<script setup>
import { CForm, CInputGroup, CInputGroupText, CFormInput, CButton } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { defineProps, defineEmits, onUpdated } from 'vue';
import { cilFile, cilPencil } from '@coreui/icons';

const emit = defineEmits(['onSubmit', 'showImageModal']);
const { brand } = defineProps(['brand']);

onUpdated(() => {
  console.log(brand);
});
</script>

<template>
  <CForm @submit.prevent="$emit('onSubmit')">
    <div class="row mb-3">
      <div :class="brand.id ? 'col-5' : 'col-6'">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"><CIcon :icon="cilPencil" /></CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Nome"
            aria-label="Nome"
            aria-describedby="basic-addon1"
            v-model="brand.name"
          />
        </CInputGroup>
      </div>
      <div :class="brand.id ? 'col-5' : 'col-6'">
        <CInputGroup class="mb-3">
          <CInputGroupText id="basic-addon1"><CIcon :icon="cilFile" /></CInputGroupText>
          <CFormInput
            type="file"
            required
            placeholder="Foto"
            aria-label="Foto"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
      </div>
      <div class="col-2" v-if="brand.id">
        <CButton color="secondary" @click="$emit('showImageModal')">Ver imagem</CButton>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <CButton color="primary" type="submit" class="me-4">
          {{ brand.id ? 'Atualizar' : 'Salvar' }}
        </CButton>
        <CButton v-if="brand.id" color="danger" class="me-4" @click="$emit('showDeleteModal')"
          >Deletar</CButton
        >
      </div>
    </div>
  </CForm>
</template>
