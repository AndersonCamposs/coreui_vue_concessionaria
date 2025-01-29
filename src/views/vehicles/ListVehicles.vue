<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import api from '@/services/api';
import VehicleListItem from '../../components/vehicles/VehicleListItem.vue';
import CollapseVehicleFilters from '../../components/vehicles/CollapseVehicleFilters.vue';

const vehicleList = ref([]);

onMounted(async () => {
  await fetchAllVehicles();
});

const handleFilter = async (searchValues) => {
  const queryString = prepareQueryString(searchValues);

  try {
    if (queryString) {
      const { data } = await api.get(`/vehicle/filter${queryString}`);
      vehicleList.value = data;
    }
  } catch (e) {
    console.log(e);
  }
};

const prepareQueryString = (searchValues) => {
  const params = [];

  if (searchValues.brand.searchValue) {
    params.push(`brand=${searchValues.brand.searchValue}`);
  }
  if (searchValues.model.searchValue) {
    params.push(`model=${searchValues.model.searchValue}`);
  }
  if (searchValues.year.searchValue) {
    params.push(`year=${searchValues.year.searchValue}`);
  }
  if (searchValues.value.searchValue) {
    params.push(`value=${searchValues.value.searchValue}`);
  }
  if (searchValues.category.searchValue) {
    params.push(`category=${searchValues.category.searchValue}`);
  }

  return params.length === 0 ? '' : `?${params.join('&')}`;
};

const onCleanFilters = async (searchValues) => {
  for (const key in searchValues) {
    searchValues[key].searchValue = '';
    searchValues[key].visible = false;
  }

  await fetchAllVehicles();
};

const fetchAllVehicles = async () => {
  try {
    const { data } = await api.get('/vehicle');
    vehicleList.value = data;
  } catch (e) {
    console.log(e.message);
  }
};
</script>

<template>
  <CollapseVehicleFilters
    @onFilter="(searchValues) => handleFilter(searchValues)"
    @onCleanFilters="(searchValues) => onCleanFilters(searchValues)"
  />
  <CAlert color="warning" v-if="vehicleList.length === 0" class="text-center">
    Não existem registros. Adicione novos veículos para que eles apareçam aqui.
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
