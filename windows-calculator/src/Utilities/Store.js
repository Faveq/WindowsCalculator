import {reactive} from 'vue'

export const store = reactive({
    userInputString: "",
    result: 0,
    equationPreview: "",
    isFirstInput: true, //First input
    insertionDone: false, //True after pressing operation button
    calculated: false, //checking for equals pressed
    lastOperation: "",
})