<script setup>
import { CCarousel, CCarouselItem } from '@coreui/vue';
const BASE_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <CCarousel indicators :interval="3000">
    <CCarouselItem v-for="photo in photos" :key="photo.id">
      <img :src="BASE_URL + '/' + photo.path" alt="" class="carousel-image" />
    </CCarouselItem>
  </CCarousel>
</template>

<style scoped>
.carousel-image {
  height: 30vw;
  border-radius: 2rem;
  object-fit: contain;
}
</style>
