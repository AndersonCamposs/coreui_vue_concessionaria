<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const props = defineProps({
  userList: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CAlert color="warning" v-if="userList.length === 0" class="text-center">
    Não existem registros. Adicione novos usuários para que eles apareçam aqui.
  </CAlert>
  <div class="container" v-else>
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
        <div class="table-responsive">
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Login</CTableHeaderCell>
                <CTableHeaderCell>Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in userList" :key="user.id">
                <CTableDataCell>{{ user.login }}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    v-if="authStore.user.role === 'ADMIN' || authStore.user.id === user.id"
                  >
                    <router-link
                      :to="'#'"
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
      </div>
    </div>
  </div>
</template>
