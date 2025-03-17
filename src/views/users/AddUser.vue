<script setup>
import UserForm from '@/components/users/UserForm.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import _ from 'lodash';
import SuccessMessage from '../../components/SuccessMessage.vue';

const router = useRouter();
const route = useRoute();

const user = reactive({
  login: '',
  password: '',
  role: '',
});

const hasSuccess = ref(false);

const onSubmit = async () => {
  try {
    const { data } = await api.post('/auth/register', JSON.stringify(user));
    router.push('UserList');
    handleSuccess();
  } catch (e) {
    console.log(e);
  }
};

const handleSuccess = () => {
  displaySuccessMessage(() => {
    router.push({ name: 'UserList' });
  });
};

const displaySuccessMessage = (callback) => {
  hasSuccess.value = true;
  setTimeout(() => {
    hasSuccess.value = false;
    if (callback) callback();
  }, 3000);
};
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar usuário</strong> <small>Preencha os dados do usuário</small>
    </CCardHeader>
    <CCardBody>
      <UserForm :user="user" @on-submit="onSubmit()" />

      <SuccessMessage
        :message="'Usuário adicionado com sucesso. Você será redirecionado.'"
        v-if="hasSuccess"
      />
    </CCardBody>
  </CCard>
</template>
