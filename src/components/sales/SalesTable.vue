<script setup>
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import dateFormatter from '@/utils/dateFormatter';
import numberFormatter from '@/utils/numberFormatter';
import { cilFile, cilTrash } from '@coreui/icons';

const emit = defineEmits(['deleteSale', 'emitReport']);

const props = defineProps({
  saleList: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CAlert color="warning" v-if="saleList.length === 0" class="text-center">
    Não existem registros. Realize vendas para que elas apareçam aqui.
  </CAlert>
  <div class="table-responsive" v-else>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>CPF do Cliente</CTableHeaderCell>
          <CTableHeaderCell>Placa do veículo</CTableHeaderCell>
          <CTableHeaderCell>Valor</CTableHeaderCell>
          <CTableHeaderCell>Data</CTableHeaderCell>
          <CTableHeaderCell>Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="sale in saleList" :key="sale.id">
          <CTableDataCell class="text-wrap">{{ sale.id }}</CTableDataCell>
          <CTableDataCell class="text-wrap">{{ sale.customer.cpf }}</CTableDataCell>
          <CTableDataCell class="text-wrap">{{ sale.vehicle.plate }}</CTableDataCell>
          <CTableDataCell class="text-wrap"> R$ {{ numberFormatter(sale.value) }} </CTableDataCell>
          <CTableDataCell class="text-wrap">{{ dateFormatter(sale.date) }}</CTableDataCell>
          <CTableDataCell>
            <CButton
              color="danger"
              v-c-tooltip="'Excluir venda'"
              class="mx-1"
              @click="$emit('deleteSale', sale.id)"
            >
              <CIcon :icon="cilTrash" />
            </CButton>
            <CButton
              color="primary"
              v-c-tooltip="'Emitir comprovante'"
              class="mx-1"
              @click="$emit('emitReport', sale.id)"
            >
              <CIcon :icon="cilFile" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>
