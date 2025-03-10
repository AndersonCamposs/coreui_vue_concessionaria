<script setup>
import { cilX } from '@coreui/icons';
import MonthlySaleAmountChart from './MonthlySaleAmountChart.vue';

const emit = defineEmits(['closeCard']);
</script>

<template>
  <div class="container-fluid">
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <CButton class="mb-1" color="danger" @click="() => $emit('closeCard')">
            <CIcon :icon="cilX" />
          </CButton>
        </CCardTitle>
        <CCardSubtitle class="mb-1"> Estatísticas pessoais </CCardSubtitle>
      </CCardHeader>
      <CCardBody> <MonthlySaleAmountChart /> </CCardBody>
    </CCard>
  </div>
</template>
