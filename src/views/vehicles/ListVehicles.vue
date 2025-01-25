<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import api from '@/services/api';
import VehicleListItem from '../../components/vehicles/VehicleListItem.vue';
import CIcon from '@coreui/icons-vue';
import { cilArrowBottom, cilArrowTop, cilSearch } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCollapse,
  CFormCheck,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/vue';

const filtersCollapseVisible = ref(false);

const vehicleList = ref([]);
const brandsList = ref([]);
const searchValues = reactive({
  brand: {
    searchValue: '',
    visible: false,
  },
});

onMounted(async () => {
  try {
    const { data } = await api.get('/vehicle');
    vehicleList.value = data;
  } catch (e) {
    console.log(e.message);
  }
});

watch(
  () => searchValues.brand.visible, // getter para a propridade reativa
  async () => {
    try {
      const { data } = await api.get('/brand');
      brandsList.value = data;
    } catch (e) {
      console.log(e.message);
    }
  },
);
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
      <CButton color="secondary" @click="filtersCollapseVisible = !filtersCollapseVisible">
        Filtros
        <CIcon :icon="filtersCollapseVisible ? cilArrowTop : cilArrowBottom" />
      </CButton>
      <div style="min-height: 5vh">
        <CCollapse :visible="filtersCollapseVisible" class="mt-1" style="width: 80vw">
          <CCard>
            <CCardBody>
              Filtrar por:
              <div class="row">
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Marca" v-model="searchValues.brand.visible" />
                  <CFormSelect
                    v-if="searchValues.brand.visible"
                    v-model="searchValues.brand.searchValue"
                  >
                    <option v-for="brand in brandsList" :key="brand.id" :value="brand.id">
                      {{ brand.name }}
                    </option>
                  </CFormSelect>
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Modelo" />
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Ano" />
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Valor" />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCollapse>
      </div>
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
