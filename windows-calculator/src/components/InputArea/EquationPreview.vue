<template>
  <h3 class="equationPreview">{{ equationPreview }}</h3>
</template>

<script setup>
import { computed, ref } from "vue";
import { store } from "../../Utilities/Store";

const equationPreview = ref(computed(() => store.equationPreview));
</script>
<style scoped>
.equationPreview {
  color: white;
  margin-right: 8px;
}
</style>
