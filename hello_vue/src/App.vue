<template>
	<div class="app">
		<h2>父组件 {{ x }}</h2>
		<Child/>
		<!-- 进行注册之后就可以全局使用 -->
		<hello/>
	</div>
</template>

<script setup lang="ts" name="App">
import Child from './Child.vue';
import { Suspense } from 'vue';
</script>

<style scoped>
.app {
	background-color: #ddd;
	border-radius: 10px;
	padding: 10px;
	box-shadow: 0 0 10px;

}
</style>