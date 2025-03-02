<script setup lang="ts">
import { cilHome } from '@coreui/icons';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">403</h1>
            <h4 class="pt-3">Oops! Você não pode olhar aqui.</h4>
            <p class="text-body-secondary float-start">
              Provavelmente você não tem autorização para acessar este recurso.
            </p>
          </div>
          <CInputGroup class="input-prepend">
            <CInputGroupText>
              <CIcon icon="cil-magnifying-glass" />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Volte para a página inicial e continue sua navegação"
              disabled
            />
            <CButton color="info">
              <CIcon :icon="cilHome" @click="() => router.push({ name: 'Home' })" />
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
