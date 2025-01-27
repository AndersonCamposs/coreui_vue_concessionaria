<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import api from '@/services/api';
import VehicleListItem from '../../components/vehicles/VehicleListItem.vue';
import CIcon from '@coreui/icons-vue';
import { cilArrowBottom, cilArrowTop, cilSearch, cilTrash } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCollapse,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/vue';

const filtersCollapseVisible = ref(false);

const vehicleList = ref([]);
const brandsList = ref([]);
const categoriesList = ref([]);
const searchValues = reactive({
  brand: {
    searchValue: '',
    visible: false,
  },
  model: {
    searchValue: '',
    visible: false,
  },
  year: {
    searchValue: '',
    visible: false,
  },
  value: {
    searchValue: '',
    visible: false,
  },
  category: {
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

const handleFilter = async () => {
  const queryString = prepareQueryString();
  console.log(queryString);
};

const prepareQueryString = () => {
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

// carrega o select do filtro de marcas
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
// carrega o select do filtro de categorias
watch(
  () => searchValues.category.visible, // getter para a propridade reativa
  async () => {
    try {
      const { data } = await api.get('/category');
      categoriesList.value = data;
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
                  <CFormCheck label="Modelo" v-model="searchValues.model.visible" />
                  <CFormInput
                    v-if="searchValues.model.visible"
                    v-model="searchValues.model.searchValue"
                    placeholder="Modelo"
                  />
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Ano" v-model="searchValues.year.visible" />
                  <CFormInput
                    v-if="searchValues.year.visible"
                    v-model="searchValues.year.searchValue"
                    type="number"
                    placeholder="Ano do veículo"
                  />
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Valor(máx.)" v-model="searchValues.value.visible" />
                  <CFormInput
                    v-if="searchValues.value.visible"
                    v-model="searchValues.value.searchValue"
                    type="number"
                    placeholder="Valor"
                  />
                </div>
                <div class="col-12 col-lg-2 col-xlg-2 col-md-4 col-sm-6">
                  <CFormCheck label="Categoria" v-model="searchValues.category.visible" />
                  <CFormSelect
                    v-if="searchValues.category.visible"
                    v-model="searchValues.category.searchValue"
                  >
                    <option
                      v-for="category in categoriesList"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </CFormSelect>
                </div>

                <div class="col-6 col-lg-1 col-xlg-1 col-md-2 col-sm-3">
                  <CButton color="primary" @click="handleFilter()"
                    ><CIcon :icon="cilSearch"
                  /></CButton>
                </div>
                <div class="col-6 col-lg-1 col-xlg-1 col-md-2 col-sm-3">
                  <CButton color="secondary"><CIcon :icon="cilTrash" /></CButton>
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
