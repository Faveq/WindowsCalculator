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

const convertString = () => {
  if (!store.userInputString.includes(",")) {
    store.userInputString = Number(store.userInputString.replace(/\s/g, ""))
      .toLocaleString("pl-PL")
      .toString();
  } //adding spaces beteen groups of numbers
    
  
};

const insertNumber = (e) => {
  // console.log("---------------------------------------------")
  // console.log("FDI: " + store.isFirstDigitInput)
  // console.log("FI: " + store.isFirstInput)
  // console.log("Calc: " + store.calculated)
  // console.log("ID: " + store.insertionDone)

  if (store.errorOccured) {
    clearEverything()
    store.errorOccured = false
  }

  if (store.isFirstDigitInput) {
    store.userInputString = "";
    store.isFirstDigitInput = false;
  }

  if (!store.insertionDone) {
    store.userInputString += e.target.value;
    convertString() 
  } else {
    store.userInputString = e.target.value;
    store.insertionDone = false;
  }
  store.lastOperation = "insertion";
};

const backspace = () => {
  store.userInputString[store.userInputString.length - 1] !== " "
    ? (store.userInputString = store.userInputString.slice(0, -1))
    : (store.userInputString = store.userInputString.slice(0, -2));
};
const clearEverything = () =>{
  store.userInputString = "0";
  store.equationPreview = "";
  store.calculated = false;
  store.isFirstDigitInput = true;
  store.isFirstInput = true
  store.insertionDone = false
  store.result = 0;
  store.lastOperation = "";
}

const makeAction = (userInput) =>{
  store.calculated = true;
      switch (store.equationPreview[store.equationPreview.length - 2]) {
        case "+":
          store.result += userInput;
          break;
        case "-":
          store.result -= userInput;
          break;
        case "×":
          store.result *= userInput;
          break;
        case "÷":
          if (userInput != 0) {
            store.result /= userInput;
            console.log(userInput)
            break;
          }else{
            store.userInputString = "Error"
            store.errorOccured = true

            return
          }
        case "=":
          return;
        default:
          return;
    }
    store.userInputString = store.result
}

const operation = (operationName) => {
  store.insertionDone = true;
  let userInput = parseFloat(store.userInputString.replace(/\s/g, "").replace(/,/g, ".")); //deleting spaces

  if (store.isFirstInput) {
    store.equationPreview = userInput.toLocaleString("pl-PL");
    store.result = userInput;
  }
  isNaN(userInput) ? (userInput = 0) : null;
  switch (operationName) {
    case "percentage":
      userInput = userInput / 100;
      store.userInputString = userInput.toString();
      return;
    case "clearEntry":
      store.userInputString = "0";
      store.isFirstDigitInput = true;
      break;
    case "clearEverything":
      clearEverything()
      return;
    case "reciprocal":
      store.result = 1 / store.result;
      store.equationPreview = store.result.toLocaleString("pl-PL");
      break;
    case "square":
      userInput = userInput * userInput;
      store.userInputString = userInput.toString();
      return;
    case "squareRoot":
      userInput = Math.sqrt(userInput);
      store.userInputString = userInput.toString();
      return;
    case "divide":
      if (!store.calculated && !store.isFirstInput &&  store.lastOperation == "insertion") {
        if (userInput != 0) {
          makeAction(userInput)
          store.equationPreview = store.result.toLocaleString("pl-PL") + " ÷ ";
        }else{
          store.userInputString="Error"
          store.errorOccured = true
          return
        }
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toLocaleString("pl-PL") + " ÷ ";
  
      }
      break;
    case "multiply":
      if (
        !store.calculated &&
        !store.isFirstInput &&
        store.lastOperation == "insertion"
      ) {
        makeAction(userInput)
        store.equationPreview = store.result.toLocaleString("pl-PL") + " × ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toLocaleString("pl-PL") + " × ";
      }
      break;
    case "add":
      if (
        !store.calculated &&
        !store.isFirstInput &&
        store.lastOperation == "insertion"
      ) {
        makeAction(userInput)
        store.equationPreview = store.result.toLocaleString("pl-PL") + " + ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toLocaleString("pl-PL") + " + ";

      }
      break;
    case "substract":
      if (
        !store.calculated &&
        !store.isFirstInput &&
        store.lastOperation == "insertion"
      ) {
        makeAction(userInput)
        store.equationPreview = store.result.toLocaleString("pl-PL") + " - ";
      } else {
        store.calculated = false;
        store.equationPreview = store.result.toLocaleString("pl-PL") + " - ";
      }
      break;
    case "changeSign":
      if (store.lastOperation == "equals") {
        userInput *= -1;
        store.result *= -1;
        store.userInputString = userInput.toLocaleString("pl-PL");
      } else {
        if (userInput !== 0 && !store.isFirstInput) {
          userInput = userInput * -1;
          store.userInputString = userInput.toLocaleString("pl-PL");
        } else {
          userInput = userInput * -1;
          store.userInputString = userInput.toLocaleString("pl-PL");
          store.equationPreview = "";
        }
      }
      return;
    case "insertComma":
      if (!store.userInputString.includes(',' || '.')) {
        store.userInputString += ","; //must be a dot
        store.insertionDone = false;
        convertString() 
      }
  
      return;

    case "equals":
      makeAction(userInput)
      store.equationPreview += userInput.toLocaleString("pl-PL") + " = ";
     !store.errorOccured ? store.userInputString = store.result.toLocaleString("pl-PL") : null
      break;
    default:
      return
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
