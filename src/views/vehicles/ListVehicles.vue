<script setup>
import { onMounted, ref, watch } from 'vue';
import api from '@/services/api';
import VehicleListItem from '../../components/vehicles/VehicleListItem.vue';
import CIcon from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';

const vehicleList = ref([]);
const searchValue = ref('');

onMounted(async () => {
  try {
    const { data } = await api.get('/vehicle');
    vehicleList.value = data;
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
});

watch(searchValue, async (newSearchValue) => {
  try {
    let response;
    if (!newSearchValue) {
      //response = await api.get('/vehicle');
    } else {
      //response = await api.get(`/vehicle/search?name=${encodeURIComponent(newSearchValue)}`);
    }
    //vehicleList.value = response.data;
    console.log(vehicleList.value);
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1"><CIcon :icon="cilSearch" /></CInputGroupText>
        <CFormInput
          type="text"
          required
          placeholder="Buscar"
          aria-label="Burcar"
          aria-describedby="basic-addon1"
          v-model="searchValue"
        />
      </CInputGroup>
    </div>
  </div>
  <CAlert color="warning" v-if="vehicleList.length === 0" class="text-center">
    Não existem registros. Adicione novas marcas para que elas apareçam aqui.
  </CAlert>
  <div v-else>
    <div class="row g-3">
      <div
        v-for="vehicle in vehicleList"
        :key="vehicle.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <VehicleListItem :vehicle="vehicle" />
      </div>
    </div>
  </div>
</template>
