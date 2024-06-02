<template>
  <div class="windowControlButtonsContainer">
    <svg-icon
      type="mdi"
      v-for="(path, index) in iconPaths"
      :path="path"
      :key="index"
      class="icon"
      :size="30"
    />
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiWindowMinimize } from "@mdi/js";
import { mdiWindowMaximize } from "@mdi/js";
import { mdiWindowClose } from "@mdi/js";

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      iconPaths: [mdiWindowMinimize, mdiWindowMaximize, mdiWindowClose],
    };
  },
};
</script>
<style scoped>
.windowControlButtonsContainer{
    align-self: end;
}
.icon{
    cursor: pointer;
    margin-left: 3px;
    color: white;
}
</style>