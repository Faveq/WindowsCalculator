<template>
  <button
    class="button"
    v-if="props.value === 'BCK'"
    @click.prevent="backspace"
    key="bck"
  >
    <svg-icon type="mdi" :path="path"></svg-icon>
  </button>
  <button
    class="button"
    v-else-if="!isNaN(parseInt(props.value))"
    name="number"
    :key="props.value"
    :value="props.value"
    @click.prevent="insertNumber"
  >
    {{ value }}
  </button>
  <button
    class="button"
    v-else
    @click.prevent="operation(Object.values(props.value)[0])"
    :key="Object.keys(props.value)[0]"
  >
    {{ Object.keys(props.value)[0] }}
  </button>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBackspaceOutline } from "@mdi/js";
import { store } from "../Utilities/Store";
import { ref, defineProps } from "vue";

const path = ref(mdiBackspaceOutline);

const props = defineProps({
  value: {
    type: [Object, String],
    required: true,
  },
});

const insertNumber = (e) => {
  if (!store.insertionDone) {
    store.userInputString += e.target.value;
    if (store.userInputString.replace(/\s/g, "").length % 3 == 0) {
      store.userInputString += " ";
    }
  } else {
    store.userInputString = e.target.value;
    store.insertionDone = false;
  }
};

const backspace = () => {
  store.userInputString[store.userInputString.length - 1] !== " "
    ? (store.userInputString = store.userInputString.slice(0, -1))
    : (store.userInputString = store.userInputString.slice(0, -2));
};

const operation = (operationName) => {
  store.insertionDone = true;
  let userInput = parseFloat(store.userInputString.replace(/\s/g, "")); //deleting spaces

  if (store.isFirstInput) {
    store.equationPreview = userInput;
    store.result = userInput;
  }

  switch (operationName) {
    case "percentage":
      store.equationPreview += " % ";
      break;
    case "clearEntry":
      store.userInputString = "";
      break;
    case "clearEverything":
      store.userInputString = "";
      store.equationPreview = "";
      store.userInputString = "";
      store.calculated = false;
      (store.isFirstInput = true),
        (store.insertionDone = false),
        (store.result = 0);
      store.lastOperation = "";
      return;
    case "reciprocal":
      console.log("Operation: reciprocal");
      break;
    case "square":
      store.result = store.result * store.result
      store.equationPreview = store.result
      break;
    case "squareRoot":
    store.result = Math.sqrt(store.result)
      store.equationPreview = store.result
      break;
    case "divide":
      if (!store.calculated && !store.isFirstInput) {
        store.result /= userInput;
        store.equationPreview = store.result.toString() + " ÷ ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toString() + " ÷ ";
      }
      break;
    case "multiply":
      if (!store.calculated && !store.isFirstInput) {
        store.result *= userInput;
        store.equationPreview = store.result.toString() + " × ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toString() + " × ";
      }
      break;
    case "add":
      if (!store.calculated && !store.isFirstInput) {
        store.result += userInput;
        store.equationPreview = store.result.toString() + " + ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toString() + " + ";
      }
      break;
    case "substract":
      if (!store.calculated && !store.isFirstInput) {
        store.result -= userInput;
        store.equationPreview = store.result.toString() + " - ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toString() + " - ";
      }
      break;
    case "changeSign":
      console.log("Operation: changeSign");
      break;
    case "insertComma":
      console.log("Operation: insertComma");
      break;

    case "equals":
      store.calculated = true;

      switch (store.lastOperation) {
        case "add":
          store.result += userInput;
          break;
        case "substract":
          store.result -= userInput;
          break;
        case "multiply":
          store.result *= userInput;
          break;
        case "divide":
          store.result /= userInput;
          break;
        case "equals":
          return;

        default:
          break;
      }
      store.equationPreview += userInput + " = ";
      store.userInputString = store.result.toString();
      break;
    default:
      console.log("Unknown operation");
  }
  store.isFirstInput = false;
  store.insertionDone = true;
  store.lastOperation = operationName;
};

//Spamming operation buttons is not a bug, its a feature
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
