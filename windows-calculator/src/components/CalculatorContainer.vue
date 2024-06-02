<template>
  <div class="calculatorContainer">
    <NameBar />
    <InputField />
    <div class="buttons">
        <ButtonTile class="button" v-for="(value, key) in buttonsValues" :value="value" :key="key"/>
    </div>
  </div>
</template>

<script>
import InputField from "./InputField.vue";
import NameBar from "./NameBar/NameBar.vue";
import ButtonTile from "./ButtonTile.vue"
export default {
  components: {
    NameBar,
    InputField,
    ButtonTile
  },
  data(){
    return{
        buttonsValues: []
    }
  },
  beforeMount(){
    this.getButtons()
  },
  methods:{
    async getButtons(){
        const response = await fetch('/buttonsValues.json')
        const data = await response.json()
        this.buttonsValues = data
        console.log(this.buttonsValues)
    }
  }
};
</script>

<style scoped>
.calculatorContainer {
  border: 1px solid black;
  background-color: #20201f;
  border-radius: 5px;
  width: 450px;
  height: 550px;
  min-width: fit-content;
  min-height: fit-content;
  resize: both;
  overflow: auto;
}
.buttons{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    background-color: pink;
}
.button{
    flex: 0 1 calc(33.33% - 10px);
}
</style>
