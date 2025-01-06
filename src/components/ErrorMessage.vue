<script setup>
import { CAlert } from '@coreui/vue';

const { message } = defineProps(["message"])
</script>
<template>
    <div class="row d-flex justify-content-center">
        <div class="col-4 text-center">
            <CAlert color="danger">{{ message }}</CAlert>
        </div>
    </div>
</template>
