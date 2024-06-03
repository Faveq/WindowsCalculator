<template>
  <h3 class="equationPreview">{{ equationPreviewString }}</h3>
</template>

<script>
import { computed } from "vue";
import { store } from "../../Utilities/Store";

export default {
  setup() {
    const equationPreviewString = computed(() => store.userInputString);

    return {
      equationPreviewString,
    };
  },
};
</script>
<style scoped>
.equationPreview {
  color: white;
  margin-right: 8px;
}
</style>
