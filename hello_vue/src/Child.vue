<template>
    <div class="child">
        <h2>子组件 {{ x }}</h2>
        <h3>当前的求和是{{ sum }}</h3>
        <h4 v-beauty>好开心</h4>
    </div>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue';
let sum = ref(0)

</script>

<style scoped>
.child{
    background-color: skyblue;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px;
}
</style>