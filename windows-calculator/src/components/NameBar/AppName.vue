<template>
  <div class="AppName">
    <svg-icon type="mdi" :path="path"></svg-icon>
    <p>Calculator</p>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalculator } from "@mdi/js";
import { ref } from "vue";

const path = ref(mdiCalculator);
</script>
<style scoped>
.AppName {
  display: flex;
  font-size: 0.8em;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
</style>
