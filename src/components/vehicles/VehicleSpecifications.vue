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
</template>
