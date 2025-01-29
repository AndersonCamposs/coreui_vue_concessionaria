<script setup>
import CIcon from '@coreui/icons-vue';
import { cilArrowBottom, cilArrowTop, cilSearch, cilTrash } from '@coreui/icons';
import {
  CButton,
  CCard,
  CCardBody,
  CCollapse,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/vue';
import { reactive, ref, watch } from 'vue';
import api from '../../services/api.js';

const emit = defineEmits(['onFilter', 'onCleanFilters']);

const filtersCollapseVisible = ref(false);

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
        <CCollapse :visible="filtersCollapseVisible" class="mt-1" style="width: 75vw">
          <CCard>
            <CCardBody>
              Filtrar por:
              <CForm @submit.prevent="$emit('onFilter', searchValues)">
                <div class="row">
                  <div class="col-12 col-lg-2 col-xl-2 col-xxl-2 col-md-4 col-sm-6">
                    <CFormCheck
                      label="Marca"
                      v-model="searchValues.brand.visible"
                      @change="
                        (event) => {
                          if (!event.target.checked) searchValues.brand.searchValue = '';
                        }
                      "
                    />
                    <CFormSelect
                      v-if="searchValues.brand.visible"
                      v-model="searchValues.brand.searchValue"
                      :required="searchValues.brand.visible"
                    >
                      <option value="" selected disabled>Selecione uma marca</option>
                      <option v-for="brand in brandsList" :key="brand.id" :value="brand.id">
                        {{ brand.name }}
                      </option>
                    </CFormSelect>
                  </div>
                  <div class="col-12 col-lg-2 col-xl-2 col-xxl-2 col-md-4 col-sm-6">
                    <CFormCheck
                      label="Modelo"
                      v-model="searchValues.model.visible"
                      @change="
                        (event) => {
                          if (!event.target.checked) searchValues.model.searchValue = '';
                        }
                      "
                    />
                    <CFormInput
                      v-if="searchValues.model.visible"
                      v-model="searchValues.model.searchValue"
                      placeholder="Modelo"
                    />
                  </div>
                  <div class="col-12 col-lg-2 col-xl-2 col-xxl-2 col-md-4 col-sm-6">
                    <CFormCheck
                      label="Ano"
                      v-model="searchValues.year.visible"
                      @change="
                        (event) => {
                          if (!event.target.checked) searchValues.year.searchValue = '';
                        }
                      "
                    />
                    <CFormInput
                      v-if="searchValues.year.visible"
                      v-model="searchValues.year.searchValue"
                      type="number"
                      placeholder="Ano do veículo"
                    />
                  </div>
                  <div class="col-12 col-lg-2 col-xl-2 col-xxl-2 col-md-4 col-sm-6">
                    <CFormCheck
                      label="Valor(máx.)"
                      v-model="searchValues.value.visible"
                      @change="
                        (event) => {
                          if (!event.target.checked) searchValues.value.searchValue = '';
                        }
                      "
                    />
                    <CFormInput
                      v-if="searchValues.value.visible"
                      v-model="searchValues.value.searchValue"
                      type="number"
                      placeholder="Valor"
                    />
                  </div>
                  <div class="col-12 col-lg-2 col-xl-2 col-xxl-2 col-md-4 col-sm-6">
                    <CFormCheck
                      label="Categoria"
                      v-model="searchValues.category.visible"
                      @change="
                        (event) => {
                          if (!event.target.checked) searchValues.category.searchValue = '';
                        }
                      "
                    />
                    <CFormSelect
                      v-if="searchValues.category.visible"
                      v-model="searchValues.category.searchValue"
                      :required="searchValues.category.visible"
                    >
                      <option value="" selected disabled>Selecione uma categoria</option>
                      <option
                        v-for="category in categoriesList"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </CFormSelect>
                  </div>

                  <div class="col-6 col-lg-1 col-xl-1 col-xxl-1 col-md-2 col-sm-3">
                    <CButton type="submit" color="primary"><CIcon :icon="cilSearch" /></CButton>
                  </div>
                  <div class="col-6 col-lg-1 col-xl-1 col-xxl-1 col-md-2 col-sm-3">
                    <CButton color="secondary" @click="$emit('onCleanFilters', searchValues)">
                      <CIcon :icon="cilTrash" />
                    </CButton>
                  </div>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCollapse>
      </div>
    </div>
  </div>
</template>
