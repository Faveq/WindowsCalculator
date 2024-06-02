<template>
  <div class="CalculatorNameBar">
    <AppName/>
    <WindowControlButtons />
  </div>
</template>

<script>
import AppName from "./AppName.vue";
import WindowControlButtons from "./WindowControlButtons.vue";

export default {
  components: {
    WindowControlButtons,
    AppName,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.CalculatorNameBar {
  background-color: rgba(0, 0, 0, 0);
  color:white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3px;
}
</style>
