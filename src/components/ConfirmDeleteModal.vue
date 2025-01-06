<script setup>
import { defineEmits } from 'vue';

const { visible } = defineProps(['visible']);

const emit = defineEmits([
    "close",
    "confirm"
])

const onConfirm = () => emit('confirm');
const onClose = () => emit('close');

</script>

<template>
    <CModal
        :visible="visible"
        @close="
          () => {
            modalVisible = false;
          }
        "
        aria-labelledby="Modal de exclusão"
      >
        <CModalHeader>
          <CModalTitle>Confirmação de exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza que deseja excluir o cliente o registro selecionado?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            @click="onClose"
          >
            Fechar
          </CButton>
          <CButton color="primary" @click="onConfirm()">Confirmar</CButton>
        </CModalFooter>
      </CModal>
</template>
