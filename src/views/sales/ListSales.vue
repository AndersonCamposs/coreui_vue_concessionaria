<script setup>
import { onMounted, ref } from 'vue';
import SalesTable from '@/components/sales/SalesTable.vue';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';
import api from '@/services/api.js';

const saleList = ref([]);
const deleteModalVisible = ref(false);
const deletedId = ref(null);

onMounted(async () => {
  try {
    const { data } = await api.get('/sale');
    saleList.value = data;
  } catch (e) {
    console.log(e);
  }
});

const onDelete = async () => {
  deleteModalVisible.value = false;
  try {
    const response = await api.delete(`/sale/${deletedId.value}`);
    reloadSaleList();
  } catch (e) {
    console.log(e);
  }
};

const reloadSaleList = () => {
  saleList.value = saleList.value.filter((sale) => sale.id != deletedId.value);
};
</script>

<template>
  <SalesTable
    :saleList="saleList"
    @delete-sale="
      (id) => {
        deletedId = id;
        deleteModalVisible = true;
      }
    "
  />
  <ConfirmDeleteModal
    :visible="deleteModalVisible"
    @confirm="onDelete"
    @close="deleteModalVisible = false"
  />
</template>
