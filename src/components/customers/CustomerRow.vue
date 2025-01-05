<script setup>
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import { CButton, CTableDataCell } from '@coreui/vue'
import { defineProps } from 'vue'

const { customer } = defineProps(['customer'])
</script>

<template>
  <CTableRow>
    <CTableDataCell>{{ customer.id }}</CTableDataCell>
    <CTableDataCell>{{ customer.name }}</CTableDataCell>
    <CTableDataCell>{{ customer.cpf }}</CTableDataCell>
    <CTableDataCell>{{ customer.email }}</CTableDataCell>
    <CTableDataCell>{{ customer.bornDate }}</CTableDataCell>
    <CTableDataCell>
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
</template>
