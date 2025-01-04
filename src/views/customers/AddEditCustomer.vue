<script setup>
import { ref } from 'vue';
import { cilPencil, cilListNumbered, cilAt, cilCalendar } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CForm, CInputGroup } from '@coreui/vue';

const name = ref('');
const cpf = ref('');
const email = ref('');
const bornDate = ref('');

const formatcpf = () => {
  let inputLength = cpf.value.length;
  if (inputLength === 3) {
    cpf.value = cpf.value + ".";
  } else if (inputLength === 7) {
    cpf.value = cpf.value + ".";
  } else if (inputLength === 11) {
    cpf.value = cpf.value + "-";
  }
}

const onSubmit = () => {
  let data = {
    name: name.value,
    cpf: cpf.value,
    email: email.value,
    bornDate: bornDate.value
  }

  console.log(JSON.stringify(data));
  clearFields();
}

const clearFields = () => {
  name.value = '';
  cpf.value = '';
  email.value = '';
  bornDate.value = '';
}
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Adicionar cliente</strong> <small>Preencha os dados do cliente</small>
    </CCardHeader>
    <CCardBody>
      <CForm @submit.prevent="onSubmit">
        <div class="row mb-3">
          <div class="col-8">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilPencil"/></CInputGroupText>
              <CFormInput
              type="text"
              required
              placeholder="Nome"
              aria-label="Nome"
              aria-describedby="basic-addon1"
              v-model="name"
              />
            </CInputGroup>
          </div>

          <div class="col-4">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilListNumbered"/></CInputGroupText>
              <CFormInput
              type="text"
              required
              placeholder="CPF"
              aria-label="CPF"
              aria-describedby="basic-addon1"
              maxlength = "14"
              @keydown="formatcpf"
              v-model="cpf"
              />
            </CInputGroup>
          </div>

          <div class="col-8">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilAt"/></CInputGroupText>
              <CFormInput
              type="email"
              required
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
              v-model="email"
              />
            </CInputGroup>
          </div>

          <div class="col-4">
            <CInputGroup class="mb-3">
              <CInputGroupText id="basic-addon1"><CIcon :icon="cilCalendar"/></CInputGroupText>
              <CFormInput
              type="date"
              required
              placeholder="Data de nascimento"
              aria-label="Data de nascimento"
              aria-describedby="basic-addon1"
              v-model="bornDate"
              />
            </CInputGroup>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <CButton color="primary" type="submit">Salvar</CButton>
          </div>
        </div>
    </CForm>
    </CCardBody>
  </CCard>
</template>
