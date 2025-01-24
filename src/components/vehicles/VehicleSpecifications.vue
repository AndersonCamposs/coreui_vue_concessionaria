<script setup>
import { cilColorPalette, cilDollar, cilFlagAlt, cilSettings, cilSpeedometer } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import numberFormatter from '@/utils/numberFormatter';
import { CButton } from '@coreui/vue';

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
  <div class="row mb-3">
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
  <div class="row mb-3">
    <div class="col-6 col-lg-4 col-md-3">
      <p class="m-0"><strong>Hodômetro</strong></p>
      <CIcon :icon="cilSpeedometer" /> {{ numberFormatter(vehicle.odometerValue) }}
    </div>
    <div class="col-6 col-lg-4 col-md-3">
      <p class="m-0"><strong>Valor</strong></p>
      <CIcon :icon="cilDollar" /> {{ numberFormatter(vehicle.value) }}
    </div>
  </div>

  <hr />
  <h5>Descrição</h5>
  <p>{{ vehicle.description ? vehicle.description : 'N/A' }}</p>

  <hr />
  <div class="row">
    <div class="col-12 col-sm-4 col-md-2 col-lg-3">
      <CButton color="primary">
        <router-link :to="{}" class="text-white text-decoration-none"> Vender</router-link>
      </CButton>
    </div>
    <div class="col-12 col-sm-4 col-md-2 col-lg-3">
      <CButton color="secondary">
        <router-link
          :to="{ name: 'VehicleAddEdit', params: { id: vehicle.id } }"
          class="text-white text-decoration-none"
        >
          Editar
        </router-link>
      </CButton>
    </div>
  </div>
</template>
