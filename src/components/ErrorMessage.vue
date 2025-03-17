<script setup>
import { CAlert } from '@coreui/vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  colWidth: {
    type: Number,
    required: false,
  },
});
</script>
<template>
  <div class="row d-flex justify-content-center">
    <div :class="colWidth ? `col-${colWidth} text-center` : `col-4 text-center`">
      <CAlert color="danger">{{ message }}</CAlert>
    </div>
  </div>
</template>
