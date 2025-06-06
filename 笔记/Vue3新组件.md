# Teleport

一种能够将我们的组件的html结构移动到指定位置的技术

to可以设置我们想要将这些元素插入的位置，经过操作，可以不收到父元素样式的影响

```
    <teleport to="body">
        <div class="modal" v-show="isShow">
            <h2>我是弹窗的标题</h2>
            <p>我是弹窗的内容</p>
            <button @click="isShow = false">关闭弹窗</button>
        </div>
    </teleport>
```

# Suspense

等待异步组件渲染一些额外的内容，让应用有更好的用户体验

使用步骤

- 异步引入组件
- 使用suspense包裹组件，配置好default和fallback
- defalut就是异步请求加载之后进行展示的
- fallback就是异步请求加载完成之前进行展示的
- 用来避免异步请求加载太慢的问题

父组件 对有异步请求的子组件进行suspense包裹

```ts
<template>
	<div class="app">
		<h2>父组件</h2>
		<!-- 当子组件具有异步请求的时候就是用这个进行包裹 -->
		 <!-- 有的网络请求很慢 -->
		  <!-- 这时我们就需要使用这个进行异步请求的操作-->
		<Suspense>
			<template v-slot:default>
				<Child />
			</template>
			<!-- 没有加载出来的时候进行展示的东西 -->
			<template v-slot:fallback>
				<h2>加载中</h2>
			</template>
		</Suspense>

	</div>
</template>
```

子组件 具有异步请求的操作 

```ts
<template>
    <div class="child">
        <h2>子组件</h2>
        <h3>当前的求和是{{ sum }}</h3>
    </div>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue';
import axios from 'axios';
let sum = ref(0)
let xxx = await axios.get('https://dog.ceo/api/breeds/image/random')
console.log(xxx.data.message)
</script>
```

