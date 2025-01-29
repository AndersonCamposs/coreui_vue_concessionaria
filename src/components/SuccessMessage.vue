<script setup>
import { CAlert, CSpinner } from '@coreui/vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-12 col-sm-8 col-md-8 col-lg-6 col-xlg-6 text-center">
      <CAlert color="success" class="d-flex flex-column justify-content-center align-items-center">
        {{ message }} <CSpinner color="success" class="mt-3" />
      </CAlert>
    </div>
  </div>
</template>
