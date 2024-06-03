<template>
  <button class="button" v-if="value === 'BCK'" @click="backspace" key="bck">
    <svg-icon type="mdi" :path="path"></svg-icon>
  </button>
  <button
    class="button"
    v-else-if="!isNaN(parseInt(value))"
    name="number"
    :key="value"
    :value="value"
    @click="insertNumber"
  >
    {{ value }}
  </button>
  <button class="button" v-else @click="operation(Object.values(value)[0])" :key="Object.keys(value)[0]">
    {{ Object.keys(value)[0] }}
  </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiBackspaceOutline } from "@mdi/js";
import { store } from "../Utilities/Store";

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
  methods: {
    insertNumber(e) {
      store.userInputString += e.target.value;
      if (store.userInputString.replace(/\s/g, "").length % 3 == 0) {
        store.userInputString += " ";
      }
    },
    backspace() {
      store.userInputString[store.userInputString.length - 1] !== " "
        ? (store.userInputString = store.userInputString.slice(0, -1))
        : (store.userInputString = store.userInputString.slice(0, -2));
    },
    operation(operationName){
      switch (operationName) {
    case 'percentage':
      console.log('Operation: percentage');
      break;
    case 'clearEntry':
    store.userInputString =''
      break;
    case 'clearEverything':
      console.log('Operation: clearEverything');
      break;
    case 'backspace':
      console.log('Operation: backspace');
      break;
    case 'reciprocal':
      console.log('Operation: reciprocal');
      break;
    case 'square':
      console.log('Operation: square');
      break;
    case 'squareRoot':
      console.log('Operation: squareRoot');
      break;
    case 'divide':
      console.log('Operation: divide');
      break;
    case 'multiply':
      console.log('Operation: multiply');
      break;
    case 'add':
      console.log('Operation: add');
      break;
    case 'substract':
      console.log('Operation: substract');
      break;
    case 'changeSign':
      console.log('Operation: changeSign');
      break;
    case 'insertComma':
      console.log('Operation: insertComma');
      break;
    case 'equals':
      console.log('Operation: equals');
      break;
    default:
      console.log('Unknown operation');
  }
    }
  },
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
