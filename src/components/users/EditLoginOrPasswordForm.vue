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
  CForm,
  CAlert,
} from '@coreui/vue';
import ErrorMessage from '../ErrorMessage.vue';
import api from '@/services/api.js';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['closeCard']);
const props = defineProps({
  actuallyPropertyProfileEdit: {
    type: String,
    required: true,
  },
});

const newPropertyValue = ref('');
const confirmNewPropertyValue = ref('');
const newPropertyAndConfirmNewPropertyAreEquals = ref(true);
const isPasswordVisible = ref(false);
const errorMessage = ref('');

const onSubmit = async () => {
  const queryString = `?${props.actuallyPropertyProfileEdit.toLowerCase()}=${newPropertyValue.value}`;
  try {
    const { data } = await api.patch(`/user/${authStore.user.id + queryString}`);
    await authStore.logout();
    router.push({ name: 'Login' });
  } catch (e) {
    console.log(e);
  }
};

const checkPropertyValue = () => {
  if (newPropertyValue.value.trim() === confirmNewPropertyValue.value.trim()) {
    newPropertyAndConfirmNewPropertyAreEquals.value = true;
    errorMessage.value = '';
  } else {
    newPropertyAndConfirmNewPropertyAreEquals.value = false;
    errorMessage.value = 'Os valor dos campos devem ser iguais.';
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
        <CCardSubtitle class="mb-1">
          Alteração de
          {{ actuallyPropertyProfileEdit === 'LOGIN' ? 'Login' : 'Senha' }}
        </CCardSubtitle>
      </CCardHeader>
      <CCardBody>
        <CForm @submit.prevent="onSubmit()">
          <div class="row">
            <div class="col-12 col-sm-4 col-md-4 col-xl-4">
              <CInputGroup>
                <CInputGroupText>
                  <CIcon :icon="cilPencil" />
                </CInputGroupText>
                <CFormInput
                  :type="
                    actuallyPropertyProfileEdit === 'LOGIN' || isPasswordVisible
                      ? 'text'
                      : 'password'
                  "
                  required
                  :placeholder="
                    actuallyPropertyProfileEdit === 'LOGIN' ? 'Novo login' : 'Nova senha'
                  "
                  :aria-label="
                    actuallyPropertyProfileEdit === 'LOGIN' ? 'Novo login' : 'Nova senha'
                  "
                  aria-describedby="basic-addon1"
                  v-model="newPropertyValue"
                  @keyup="checkPropertyValue()"
                />
              </CInputGroup>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xl-4">
              <CInputGroup>
                <CInputGroupText>
                  <CIcon :icon="cilPencil" />
                </CInputGroupText>
                <CFormInput
                  :type="
                    actuallyPropertyProfileEdit === 'LOGIN' || isPasswordVisible
                      ? 'text'
                      : 'password'
                  "
                  required
                  :placeholder="
                    actuallyPropertyProfileEdit === 'LOGIN'
                      ? 'Repetir novo login'
                      : 'Repetir nova senha'
                  "
                  :aria-label="
                    actuallyPropertyProfileEdit === 'LOGIN'
                      ? 'Repetir novo login'
                      : 'Repetir nova senha'
                  "
                  aria-describedby="basic-addon1"
                  v-model="confirmNewPropertyValue"
                  @keyup="checkPropertyValue()"
                />
              </CInputGroup>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xl-4">
              <CButton
                color="primary"
                type="submit"
                :disabled="!newPropertyAndConfirmNewPropertyAreEquals"
                >Alterar</CButton
              >
            </div>
          </div>
          <div class="row mt-1" v-if="actuallyPropertyProfileEdit === 'PASSWORD'">
            <div class="col-12 col-sm-4 col-md-4 col-xl-4">
              <CFormCheck label="Exibir senhas" @change="isPasswordVisible = !isPasswordVisible" />
            </div>
          </div>
        </CForm>
        <ErrorMessage
          v-if="!newPropertyAndConfirmNewPropertyAreEquals"
          :message="errorMessage"
          :colWidth="6"
          class="mt-3"
        />
        <CAlert color="warning text-center" class="mt-2">
          Ao salvar as informações, você será levado a fazer login novamente.
        </CAlert>
      </CCardBody>
    </CCard>
  </div>
</template>
