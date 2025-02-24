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
    await emitCancellationReport();
    reloadSaleList();
  } catch (e) {
    console.log(e);
  }
};

const emitConfirmationReport = async (id) => {
  try {
    const sale = saleList.value.find((sale) => sale.id === id);
    const { data } = await api.post('/report/confirmation-purchase', sale, {
      responseType: 'blob',
    });
    downloadDocument(data, 'confirmacao-compra.pdf');
  } catch (e) {
    console.log(e);
  }
};

const emitCancellationReport = async () => {
  try {
    const sale = saleList.value.find((sale) => sale.id === deletedId.value);
    const { data } = await api.post('/report/cancellation-purchase', sale, {
      responseType: 'blob',
    });
    downloadDocument(data, 'cancelamento-compra.pdf');
  } catch (e) {
    console.log(e);
  }
};

const downloadDocument = (data, downloadName) => {
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
    @emit-confirmation-report="
      (id) => {
        emitConfirmationReport(id);
      }
    "
  />
  <ConfirmDeleteModal
    :visible="deleteModalVisible"
    @confirm="onDelete"
    @close="deleteModalVisible = false"
  />
</template>
