<script setup>
import { onMounted, ref } from 'vue';
import api from '@/services/api.js';
import { CChart } from '@coreui/vue-chartjs';

const months = [
  {
    pt_br: 'JANEIRO',
    en_us: 'JANUARY',
  },
  {
    pt_br: 'FEVEREIRO',
    en_us: 'FEBRUARY',
  },
  {
    pt_br: 'MARÇO',
    en_us: 'MARCH',
  },
  {
    pt_br: 'ABRIL',
    en_us: 'APRIL',
  },
  {
    pt_br: 'MAIO',
    en_us: 'MAY',
  },
  {
    pt_br: 'JUNHO',
    en_us: 'JUNE',
  },
  {
    pt_br: 'JULHO',
    en_us: 'JULY',
  },
  {
    pt_br: 'AGOSTO',
    en_us: 'AUGUST',
  },
  {
    pt_br: 'SETEMBRO',
    en_us: 'SEPTEMBER',
  },
  {
    pt_br: 'OUTUBRO',
    en_us: 'OCTOBER',
  },
  {
    pt_br: 'NOVEMBRO',
    en_us: 'NOVEMBER',
  },
  {
    pt_br: 'DEZEMBRO',
    en_us: 'DECEMBER',
  },
];

const labels = ref([]);
months.forEach((month) => {
  labels.value.push(month.pt_br);
});

const chartData = ref([]);

onMounted(async () => {
  try {
    const { data } = await api.get('/statistic/user/sales/monthly-amount');
    prepareChartData(data);
  } catch (e) {
    console.log(e);
  }
});

const prepareChartData = (data) => {
  months.forEach((month) => {
    const register = data.find((v) => v.month === month.en_us);
    if (register) {
      chartData.value.push(register.amount);
    } else {
      chartData.value.push(0);
    }
  });
};
</script>

<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <CChart
        v-if="chartData.length !== 0"
        type="bar"
        style="width: 100%; height: 480px"
        :data="{
          labels: labels,
          datasets: [
            {
              label: 'Total em R$',
              data: chartData,
            },
          ],
        }"
        :options="{
          scales: {
            y: {
              min: 0,
              max: Math.max(...chartData) + 50000,
            },
          },
        }"
      />
    </div>
  </div>
</template>
