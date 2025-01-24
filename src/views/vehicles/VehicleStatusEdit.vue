<script setup>
import EditStatusForm from '@/components/vehicles/EditStatusForm.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { ref } from 'vue';
const error = ref(false);
const errorMessage = ref('');

const showError = (message) => {
  errorMessage.value = message;
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
};
</script>

<template>
  <div class="mb-3">
    <h3 class="text-center">Busque pelo veículo que deseja atualizar</h3>
    <hr />
  </div>
  <EditStatusForm @has-error="(message) => showError(message)" />
  <ErrorMessage :message="errorMessage" v-if="error" />
</template>
