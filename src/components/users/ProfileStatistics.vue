<script setup>
import { cilX } from '@coreui/icons';
import MonthlyAmountChart from './MonthlyAmountChart.vue';
import MonthlyCountChart from './MonthlyCountChart.vue';

const emit = defineEmits(['closeCard']);

const props = defineProps({
  monthlyAmountChartIsVisible: {
    type: Boolean,
    required: true,
  },
  monthlyCountChartIsVisible: {
    type: Boolean,
    required: true,
  },
});
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
      <CCardBody>
        <MonthlyAmountChart v-if="monthlyAmountChartIsVisible" />
        <MonthlyCountChart v-else-if="monthlyCountChartIsVisible" />
      </CCardBody>
    </CCard>
  </div>
</template>
