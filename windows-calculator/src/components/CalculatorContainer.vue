<template>
  <div class="calculatorContainer">
    <TopBar />
    <div class="inputArea">
      <EquationPreview/>
      <InputField />
    </div>
    <div class="buttons">
      <ButtonTile
        v-for="(value, key) in buttonsValues"
        :value="value"
        :key="key"
      />
    </div>
  </div>
</template>

<script setup>
import InputField from "./InputArea/InputField.vue";
import EquationPreview from "./InputArea/EquationPreview.vue";
import TopBar from "./NameBar/TopBar.vue";
import ButtonTile from "./ButtonTile.vue";
import { ref, onBeforeMount } from 'vue';

const buttonsValues = ref([]);

const getButtons = async () => {
  const response = await fetch("/buttonsValues.json");
  const data = await response.json();
  buttonsValues.value = data;
};

onBeforeMount(getButtons)
</script>

<style scoped>
.calculatorContainer {
  background-color: #202020;
  border-radius: 5px;
  width: 371px;
  height: 617px;
  min-height: 450px;
  min-width: 310px;
  padding: 5px;
  resize: both;
  overflow: hidden;
  user-select: none;
}
.inputArea{
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: auto;
  height: 62%;
}
.buttons > *:last-child {
  background-color: #595959;
  color: black;
}
.buttons > *:last-child:hover {
  background-color: #535353;
}
.buttons > *:last-child:active {
  background-color: #4d4d4d;
}
.buttons > *:nth-child(n + 9):nth-child(-n + 11),
.buttons > *:nth-child(n + 13):nth-child(-n + 15),
.buttons > *:nth-child(n + 17):nth-child(-n + 19),
.buttons > *:nth-child(n + 21):nth-child(-n + 23) {
  background-color: #3b3b3b;
}
.buttons > *:nth-child(n + 9):nth-child(-n + 11):hover,
.buttons > *:nth-child(n + 13):nth-child(-n + 15):hover,
.buttons > *:nth-child(n + 17):nth-child(-n + 19):hover,
.buttons > *:nth-child(n + 21):nth-child(-n + 23):hover {
  background-color: #323232;
}
.buttons > *:nth-child(n + 9):nth-child(-n + 11):active,
.buttons > *:nth-child(n + 13):nth-child(-n + 15):active,
.buttons > *:nth-child(n + 17):nth-child(-n + 19):active,
.buttons > *:nth-child(n + 21):nth-child(-n + 23):active {
  background-color: #272827;
}
</style>
