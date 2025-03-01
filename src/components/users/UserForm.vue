<script setup>
import { cilCheckAlt, cilFace, cilLockLocked, cilPencil, cilText } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CFormInput, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/vue';

const emit = defineEmits(['onSubmit']);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CForm @submit.prevent="$emit('onSubmit')">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
          <CInputGroup class="mb-3">
            <CInputGroupText id="basic-addon1">
              <CIcon :icon="cilPencil" />
            </CInputGroupText>
            <CFormInput
              type="text"
              required
              placeholder="Login"
              aria-label="Login"
              aria-describedby="basic-addon1"
              v-model="user.login"
            />
          </CInputGroup>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
          <CInputGroup class="mb-3">
            <CInputGroupText id="basic-addon1">
              <CIcon :icon="cilLockLocked" />
            </CInputGroupText>
            <CFormInput
              type="text"
              required
              placeholder="Senha"
              aria-label="Senha"
              aria-describedby="basic-addon1"
              v-model="user.password"
            />
          </CInputGroup>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
          <CInputGroup class="mb-3">
            <CInputGroupText id="basic-addon1">
              <CIcon :icon="cilFace" />
            </CInputGroupText>

            <CFormSelect v-model="user.role" required>
              <option value="" disabled selected>Selecione a permissão</option>
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </CFormSelect>
          </CInputGroup>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
          <CButton color="primary" type="submit">Salvar usuário</CButton>
        </div>
      </div>
    </div>
  </CForm>
</template>
