<template>
  <button class="button" v-if="value !== 'BCK'">{{ value }}</button>
  <button class="button" v-else>
    <svg-icon type="mdi" :path="path"></svg-icon>
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBackspaceOutline } from "@mdi/js";
export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiBackspaceOutline,
    };
  },
  props: ["value"],
};
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24.5%;
  height: calc(100% / 6);
  border: none;
  border-radius: 6px;
  background-color: #323232;
  color: white;
  font-size: 1em;
}
button:hover {
  background-color: #3b3b3b;
}
button:active {
  background-color: #272827;
}
</style>
