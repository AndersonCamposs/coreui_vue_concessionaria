<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CFormInput, CInputGroup, CInputGroupText } from '@coreui/vue';
import { reactive, ref } from 'vue';
import api from '@/services/api.js';
import _ from 'lodash';

const searchLogin = ref('');

const user = reactive({
  id: '',
  login: '',
  password: '',
  role: '',
});

const searchUser = async () => {
  try {
    const { data } = await api.get(`/user/search/${searchLogin.value}`);
    loadUserData(data);
  } catch (e) {
    console.log(e);
  }
};

const loadUserData = (data) => {
  _.merge(user, data);
  console.log(user);
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-6">
        <CInputGroup>
          <CInputGroupText>
            <CIcon :icon="cilPencil" />
          </CInputGroupText>
          <CFormInput
            type="text"
            required
            placeholder="Informe o login do usuário"
            aria-label="Informe o login do usuário"
            aria-describedby="basic-addon1"
            v-model="searchLogin"
          />
        </CInputGroup>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <CButton color="primary" @click="searchUser()"> Buscar </CButton>
      </div>
    </div>
  </div>
</template>
