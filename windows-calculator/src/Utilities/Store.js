import {reactive} from 'vue'

export const store = reactive({
    userInputString: "0",
    result: 0,
    equationPreview: "",
    isFirstInput: true, //First input
    isFirstDigitInput: true, //First input
    insertionDone: false, //True after pressing operation button
    calculated: false, //checking for equals pressed
    errorOccured: false, //checking for error like division by 0
    lastOperation: "",
})