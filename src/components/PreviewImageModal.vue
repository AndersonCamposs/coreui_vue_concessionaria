<script setup>
import { defineEmits, defineProps } from 'vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close', 'confirm']);

const onClose = () => emit('close');
</script>

<template>
  <CModal :visible="visible" @close="onClose" aria-labelledby="Modal de exclusão">
    <CModalHeader>
      <CModalTitle>Imagem da marca</CModalTitle>
    </CModalHeader>
    <img :src="BASE_URL + '/' + imageUrl" alt="Imagem da marca do carro" style="" />
    <CModalFooter>
      <CButton color="secondary" @click="onClose"> Fechar </CButton>
    </CModalFooter>
  </CModal>
</template>
