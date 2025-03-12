<script setup>
import { cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
import { CButton, CFormInput, CInputGroup, CInputGroupText } from '@coreui/vue';
import { reactive, ref } from 'vue';
import api from '@/services/api.js';
import { useAuthStore } from '@/stores/auth';
import _ from 'lodash';
import EditLoginOrPasswordForm from '@/components/users/EditLoginOrPasswordForm.vue';
import ProfileStatistics from '../../components/users/ProfileStatistics.vue';

const showEditLoginOrPasswordForm = ref(false);
const actuallyPropertyProfileEdit = ref('');

const showProfileStatistics = ref(false);

const authStore = useAuthStore();
</script>

<template>
  <div class="container-fluid">
    <div class="row mb-2">
      <h4>
        Olá, <span class="text-info">{{ authStore.user && authStore.user.login }}</span
        >. Aqui você acessa as informações de seu perfil. O que deseja fazer?
      </h4>
    </div>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-xl-4 col-xxl-4 my-2">
        <CWidgetStatsA color="primary" class="p-2">
          <template #value> Informações pessoais </template>
          <template #title>Você pode editá-las aqui.</template>
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon icon="cil-options" class="text-white" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  @click="
                    () => {
                      showEditLoginOrPasswordForm = true;
                      actuallyPropertyProfileEdit = 'LOGIN';
                      showProfileStatistics = false;
                    }
                  "
                >
                  Editar login
                </CDropdownItem>
                <CDropdownItem
                  @click="
                    () => {
                      showEditLoginOrPasswordForm = true;
                      actuallyPropertyProfileEdit = 'PASSWORD';
                      showProfileStatistics = false;
                    }
                  "
                  >Editar senha</CDropdownItem
                >
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </div>
      <div class="col-12 col-sm-6 col-xl-4 col-xxl-4 my-2">
        <CWidgetStatsA color="info" class="p-2">
          <template #value> Suas estatísticas </template>
          <template #title>Você pode visualizá-las aqui.</template>
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon icon="cil-options" class="text-white" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  @click="
                    () => {
                      showProfileStatistics = true;
                      showEditLoginOrPasswordForm = false;
                    }
                  "
                  >Minhas vendas</CDropdownItem
                >
                <CDropdownItem href="#">Meus faturamentos</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </div>
    </div>
  </div>
  <EditLoginOrPasswordForm
    v-if="showEditLoginOrPasswordForm"
    :actuallyPropertyProfileEdit="actuallyPropertyProfileEdit"
    @close-card="
      () => {
        showEditLoginOrPasswordForm = false;
        actuallyPropertyProfileEdit = '';
      }
    "
  />
  <ProfileStatistics
    v-if="showProfileStatistics"
    @close-card="() => (showProfileStatistics = false)"
  />
</template>
