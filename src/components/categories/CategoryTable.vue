<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CTableDataCell } from '@coreui/vue';
import { defineProps } from 'vue';

const props = defineProps({
  categoryList: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CAlert color="warning" v-if="categoryList.length === 0" class="text-center">
    Não existem registros. Adicione novos clientes para que eles apareçam aqui.
  </CAlert>
  <div class="table-responsive" v-else>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
          <CTableHeaderCell scope="col" class="d-none d-md-table-cell">Descrição</CTableHeaderCell>
          <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody v-for="category in categoryList" v-bind:key="category.id">
        <CTableRow>
          <CTableDataCell class="text-wrap">{{ category.id }}</CTableDataCell>
          <CTableDataCell class="text-wrap">{{ category.name }}</CTableDataCell>
          <CTableDataCell class="text-wrap d-none d-md-table-cell">
            {{ category.description }}
          </CTableDataCell>
          <CTableDataCell class="text-wrap">
            <CButton color="primary">
              <router-link
                :to="{ name: 'CategoryAddEdit', params: { id: category.id } }"
                class="text-white text-decoration-none d-flex align-items-center"
              >
                <CIcon :icon="cilPencil" class="me-2" /> Editar
              </router-link>
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>
