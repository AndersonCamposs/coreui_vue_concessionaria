<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CTableDataCell } from '@coreui/vue';
import { defineProps } from 'vue';

const { customerList } = defineProps(['customerList']);
</script>

<template>
  <CAlert color="warning" v-if="customerList.length === 0" class="text-center">
    Não existem registros. Adicione novos clientes para que eles apareçam aqui.
  </CAlert>
  <div class="table-responsive" v-else>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
          <CTableHeaderCell scope="col" class="d-none d-md-table-cell">CPF</CTableHeaderCell>
          <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
          <CTableHeaderCell scope="col" class="d-none d-md-table-cell">
            Data de Nascimento
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody v-for="customer in customerList" v-bind:key="customer.id">
        <CTableRow>
          <CTableDataCell class="text-wrap">{{ customer.id }}</CTableDataCell>
          <CTableDataCell class="text-wrap">{{ customer.name }}</CTableDataCell>
          <CTableDataCell class="text-wrap d-none d-md-table-cell">
            {{ customer.cpf }}
          </CTableDataCell>
          <CTableDataCell class="text-wrap">{{ customer.email }}</CTableDataCell>
          <CTableDataCell class="text-wrap d-none d-md-table-cell">
            {{ customer.bornDate }}
          </CTableDataCell>
          <CTableDataCell class="text-wrap">
            <CButton color="primary">
              <router-link
                :to="{ name: 'CustomerAddEdit', params: { id: customer.id } }"
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
