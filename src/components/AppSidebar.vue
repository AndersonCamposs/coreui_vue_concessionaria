<script setup>
import { RouterLink, useRouter } from 'vue-router';

import { logo } from '@/assets/brand/logo';
import { sygnet } from '@/assets/brand/sygnet';
import { AppSidebarNav } from '@/components/AppSidebarNav.js';
import { useSidebarStore } from '@/stores/sidebar.js';
import { useAuthStore } from '../stores/auth';

const sidebar = useSidebarStore();
const authStore = useAuthStore();
const router = useRouter();

const onLogout = async () => {
  try {
    await authStore.logout();
  } catch (e) {
    console.log('Erro ao realizar o logout: ', e);
  } finally {
    router.push({ name: 'Login' });
  }
};
</script>

<template>
  <CSidebar
    class="border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible"
    @visible-change="(value) => sidebar.toggleVisible(value)"
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="sidebar.toggleVisible()" />
    </CSidebarHeader>
    <AppSidebarNav />
    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="onLogout()" />
    </CSidebarFooter>
  </CSidebar>
</template>
