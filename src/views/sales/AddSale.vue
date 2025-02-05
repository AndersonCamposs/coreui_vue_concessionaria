<script setup>
import { cilClipboard, cilListNumbered } from '@coreui/icons';
</script>

<template>
  <div class="row mb-1">
    <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">
          <CIcon :icon="cilClipboard" />
        </CInputGroupText>
        <CFormInput
          type="text"
          required
          placeholder="Placa do veículo"
          aria-label="Placa do veículo"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
    </div>
    <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
      <CButton color="secondary">Buscar</CButton>
    </div>
    <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">
          <CIcon :icon="cilListNumbered" />
        </CInputGroupText>
        <CFormInput
          type="text"
          required
          placeholder="CPF do cliente"
          aria-label="CPF do cliente"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
    </div>
    <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xlg-3">
      <CButton color="secondary">Buscar</CButton>
    </div>
  </div>
</template>
