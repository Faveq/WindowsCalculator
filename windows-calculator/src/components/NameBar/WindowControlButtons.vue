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

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiWindowMinimize } from "@mdi/js";
import { mdiWindowMaximize } from "@mdi/js";
import { mdiWindowClose } from "@mdi/js";
import { ref } from 'vue';

const iconPaths = ref([mdiWindowMinimize, mdiWindowMaximize, mdiWindowClose])

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