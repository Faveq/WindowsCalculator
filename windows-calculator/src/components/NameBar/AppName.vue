<template>
  <div class="AppName">
    <svg-icon type="mdi" :path="path"></svg-icon>
    <p>Calculator</p>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalculator } from "@mdi/js";

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiCalculator,
    };
  },
};
</script>
<style scoped>
.AppName {
display: flex;
font-size: .8em;
gap: 10px;
justify-content: center;
align-items: center;
}
</style>
