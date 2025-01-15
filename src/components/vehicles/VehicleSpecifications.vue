<script setup>
const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <h3 class="text-center">{{ `${vehicle.model}(${vehicle.year})` }}</h3>
  <hr />
  Content
  <hr />
  <h5>Descrição</h5>
  <p>{{ vehicle.description ? vehicle.description : 'N/A' }}</p>
</template>
