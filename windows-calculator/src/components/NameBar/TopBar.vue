<template>
  <div class="CalculatorTopBar">
    <AppName/>
    <WindowControlButtons />
  </div>
</template>

<script setup>
import AppName from "./AppName.vue";
import WindowControlButtons from "./WindowControlButtons.vue";
</script>
<style scoped>
.CalculatorTopBar {
  background-color: rgba(0, 0, 0, 0);
  color:white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3px;
}
</style>
