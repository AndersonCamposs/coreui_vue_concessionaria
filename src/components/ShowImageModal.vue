<script setup>
import { mergeAttributes } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { defineEmits, defineProps } from 'vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const { visible, imageUrl } = defineProps(['visible', 'imageUrl']);

const emit = defineEmits(['close', 'confirm']);

const onClose = () => emit('close');
</script>

<template>
  <CModal :visible="visible" @close="onClose" aria-labelledby="Modal de exclusão">
    <CModalHeader>
      <CModalTitle>Imagem da marca</CModalTitle>
    </CModalHeader>
    <img :src="BASE_URL + imageUrl" alt="Imagem da marca do carro" style="" />
    <CModalFooter>
      <CButton color="secondary" @click="onClose"> Fechar </CButton>
    </CModalFooter>
  </CModal>
</template>
