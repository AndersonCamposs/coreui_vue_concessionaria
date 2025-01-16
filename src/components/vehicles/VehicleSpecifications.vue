<script setup>
import { cilColorPalette, cilFlagAlt, cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <h3 class="text-center">{{ `${vehicle.brand.name} ${vehicle.model}(${vehicle.year})` }}</h3>
  <hr />
  <div class="row">
    <div class="col-6 col-lg-4 col-md-3">
      <p class="m-0"><strong>Cor</strong></p>
      <CIcon :icon="cilColorPalette" /> {{ vehicle.color }}
    </div>
    <div class="col-6 col-lg-4 col-md-3">
      <p class="m-0"><strong>Categoria</strong></p>
      <CIcon :icon="cilFlagAlt" /> {{ vehicle.category.name }}
    </div>
    <div class="col-6 col-lg-4 col-md-3">
      <p class="m-0"><strong>Tipo de transmissão</strong></p>
      <CIcon :icon="cilSettings" /> {{ vehicle.transmissionType }}
    </div>
  </div>
  <hr />
  <h5>Descrição</h5>
  <p>{{ vehicle.description ? vehicle.description : 'N/A' }}</p>
</template>
