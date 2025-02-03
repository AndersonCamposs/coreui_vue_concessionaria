<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const login = ref('');
const password = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const onSubmit = async () => {
  isLoading.value = true;

  try {
    const { data } = await authStore.login({ login: login.value, password: password.value });

    router.push({ name: 'Home' });
  } catch (e) {
    console.log('Erro ao realizar o login: ', e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Entre na sua conta</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Login" autocomplete="Login" v-model="login" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="Senha"
                      placeholder="Senha"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" :disabled="isLoading" @click="onSubmit">
                        Entrar
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard id="welcome-card" class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Seja bem-vindo(a)</h2>
                  <p>
                    Para acessar o sistema e todos os seus recursos. Ainda não tem sua conta? Entre
                    em contato com a gerência.
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<style scoped>
@media (max-width: 580px) {
  #welcome-card {
    display: none;
  }
}
</style>
