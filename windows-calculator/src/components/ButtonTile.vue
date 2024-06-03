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
import { ref, defineProps } from 'vue';


  const path = ref(mdiBackspaceOutline)
  const isFirstInput = ref(true)
  const calculationsDone = ref(false)

  const props = defineProps({
  value: {
    type: [Object, String],
    required: true
  }
});

    const insertNumber = (e) => {
      console.log(calculationsDone.value);
      if (!calculationsDone.value) {
        store.userInputString += e.target.value;
        if (store.userInputString.replace(/\s/g, "").length % 3 == 0) {
          store.userInputString += " ";
        }
      } else {
        console.log("dziala");
        store.userInputString = e.target.value;
        calculationsDone.value = false;
      }
    }
    const backspace = ()=> {
      store.userInputString[store.userInputString.length - 1] !== " "
        ? (store.userInputString = store.userInputString.slice(0, -1))
        : (store.userInputString = store.userInputString.slice(0, -2));
    }
    const operation = (operationName) => {
      calculationsDone.value = true;
      let userInput = parseFloat(store.userInputString.replace(/\s/g, ""));

      console.log("FI: " + isFirstInput.value)
      isFirstInput.value ? (store.equationPreview = userInput) : console.log("das");
      isFirstInput.value = false;

      switch (operationName) {
        case "percentage":
          store.equationPreview += " % ";
          break;
        case "clearEntry":
          store.userInputString = "";
          console.log("FICE: " + isFirstInput.value)
          break;
        case "clearEverything":
          store.userInputString = "";
          store.equationPreview = "";
          store.userInputString = "";
          store.result = 0;
          break;
        case "reciprocal":
          console.log("Operation: reciprocal");
          break;
        case "square":
          console.log("Operation: square");
          break;
        case "squareRoot":
          console.log("Operation: squareRoot");
          break;
        case "divide":
          console.log("Operation: divide");
          break;
        case "multiply":
          console.log("Operation: multiply");
          break;
        case "add":
          store.result += userInput;
          store.equationPreview = store.result.toString() + " + ";
          console.log(store.equationPreview);
          break;
        case "substract":
          console.log("Operation: substract");
          break;
        case "changeSign":
          console.log("Operation: changeSign");
          break;
        case "insertComma":
          console.log("Operation: insertComma");
          break;
        case "equals":
          store.result += userInput;
          store.equationPreview += userInput + " = ";
          store.userInputString = store.result.toString()
          isFirstInput.value = true;
          break;
        default:
          console.log("Unknown operation");
      }
      
    }

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
