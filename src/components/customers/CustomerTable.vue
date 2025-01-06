<script setup>
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import { CButton, CTableDataCell } from '@coreui/vue'
import { defineProps } from 'vue'

const { customerList } = defineProps(['customer'])
</script>

<template>
    <CAlert color="warning" v-if="customerList.length === 0" class="text-center">
        Não existem registros.
        Adicione novos clientes para que eles apareçam aqui.
    </CAlert>
    <CTable striped v-else>
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Data de Nascimento</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody v-for="customer in customerList" v-bind:key="customer.id">
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
        </CTableBody>
    </CTable>
</template>
