<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserTable from '../../components/users/UserTable.vue';
import api from '../../services/api.js';

const userList = ref([]);

onMounted(async () => {
  try {
    const { data } = await api.get('/user');
    userList.value = data;
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <UserTable :userList="userList" />
</template>
