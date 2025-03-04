<script setup>
import { cilPencil, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardTitle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/vue';
import { nextTick, ref } from 'vue';
import ErrorMessage from '../ErrorMessage.vue';

const emit = defineEmits(['closeCard']);
const newLogin = ref('');
const confirmNewLogin = ref('');
const newLoginAndConfirmNewLoginAreEquals = ref(true);

const onSubmit = async () => {
  try {
    console.log('ok');
  } catch (e) {
    console.log(e);
  }
};

const checkLoginValue = () => {
  if (newLogin.value.trim() === confirmNewLogin.value.trim()) {
    newLoginAndConfirmNewLoginAreEquals.value = true;
  } else {
    newLoginAndConfirmNewLoginAreEquals.value = false;
  }
};
</script>

<template>
  <div class="container-fluid">
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <CButton class="mb-1" color="danger" @click="() => $emit('closeCard')">
            <CIcon :icon="cilX" />
          </CButton>
        </CCardTitle>
        <CCardSubtitle>Alteração de nome de usuário</CCardSubtitle>
      </CCardHeader>
      <CCardBody>
        <div class="row">
          <div class="col-12 col-sm-4 col-md-4 col-xl-4">
            <CInputGroup>
              <CInputGroupText>
                <CIcon :icon="cilPencil" />
              </CInputGroupText>
              <CFormInput
                type="text"
                required
                placeholder="Novo login"
                aria-label="Novo login"
                aria-describedby="basic-addon1"
                v-model="newLogin"
                @keyup="checkLoginValue()"
              />
            </CInputGroup>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xl-4">
            <CInputGroup>
              <CInputGroupText>
                <CIcon :icon="cilPencil" />
              </CInputGroupText>
              <CFormInput
                type="text"
                required
                placeholder="Repetir novo login"
                aria-label="Repetir novo login"
                aria-describedby="basic-addon1"
                v-model="confirmNewLogin"
                @keyup="checkLoginValue()"
              />
            </CInputGroup>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xl-4">
            <CButton
              color="primary"
              @click="onSubmit"
              :disabled="!newLoginAndConfirmNewLoginAreEquals"
              >Alterar</CButton
            >
          </div>
        </div>
        <ErrorMessage
          v-if="!newLoginAndConfirmNewLoginAreEquals"
          :message="'Os logins informados são diferentes'"
          class="mt-3"
        />
      </CCardBody>
    </CCard>
  </div>
</template>
