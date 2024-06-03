<template>
  <div class="inputField">
    <h2>{{ input }}</h2>
  </div>
</template>

<script setup>
import { store } from "../../Utilities/Store";
import { computed } from "vue";
import { ref } from "vue";

const input = ref(computed(() => store.userInputString));

</script>
<style scoped>
.inputField {
  position: relative;
  display: flex;
  padding: 5px;
  letter-spacing: 1px;
  color: white;
  align-items: center;
  justify-content: end;
  width: 100%;
}
h2 {
  font-size: 2.3em;
  font-weight: 600;
  user-select: text;
}
</style>
