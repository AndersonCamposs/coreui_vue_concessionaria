<script setup>
import { cilAsteriskCircle } from '@coreui/icons';
import { CInputGroup } from '@coreui/vue';
import { defineEmits, ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const userPassword = ref('');

const emit = defineEmits(['close', 'confirm']);

const onConfirm = () => emit('confirm', userPassword);
const onClose = () => emit('close');
</script>

<template>
  <CModal :visible="visible" @close="onClose" aria-labelledby="Modal de exclusão" backdrop="static">
    <CModalHeader>
      <CModalTitle>Verificação de segurança</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">
          <CIcon :icon="cilAsteriskCircle" />
        </CInputGroupText>
        <CFormInput
          type="password"
          required
          placeholder="Sua senha"
          aria-label="Sua senha"
          aria-describedby="basic-addon1"
          v-model="userPassword"
        />
      </CInputGroup>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="onClose"> Fechar </CButton>
      <CButton color="primary" @click="onConfirm()">Confirmar</CButton>
    </CModalFooter>
  </CModal>
</template>
