<script setup>
import UserForm from '@/components/users/UserForm.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import _ from 'lodash';

const router = useRouter();
const route = useRoute();

const user = reactive({
  login: '',
  password: '',
  role: '',
});

const userId = ref(route.params.id || null);

const onSubmit = async () => {
  try {
    console.log('submit');
  } catch (e) {
    console.log(e);
  }
};

const clearFields = () => {
  user.login = '';
  user.password = '';
  user.role = '';
};

const loadUserData = async (id) => {
  try {
    const { data } = await api.get(`/user/${userId.value}`);
    fillFields(data);
  } catch (e) {
    console.log(e);
  }
};

const fillFields = (data) => {
  _.merge(user, data);
  console.log(user);
};

watch(
  () => route.params.id,
  (newId) => {
    userId.value = newId || null;
    if (!newId) {
      clearFields();
    } else {
      loadUserData(newId);
    }
  },
  { immediate: true },
);
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar usuário</strong> <small>Preencha os dados do usuário</small>
    </CCardHeader>
    <CCardBody>
      <UserForm :user="user" @on-submit="onSubmit()" />
    </CCardBody>
  </CCard>
</template>
