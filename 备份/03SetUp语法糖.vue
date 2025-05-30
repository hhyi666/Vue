<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <h2>地址：{{ address }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看电话</button>
    </div>
</template>

<script lang="ts">
    export default {  //vue3的语法的实现
        name: "Person",
    }
</script>

<!-- 这里就能够直接将想要交出去的值(函数)return出去 -->
<script setup lang="ts" name="Person new">  
// 使用插件能直接设置名字就不需要上面的export
    //相当于直接写了以一个 setup
    let name = "张三"
    let age = 10
    let address = "chengdu"
    function changeAge(){
        age += 1
        console.log(age)
    }
</script>

<style>
.person {
    background-color: skyblue;
    box-shadow: 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin: 0 10px;
}
</style>