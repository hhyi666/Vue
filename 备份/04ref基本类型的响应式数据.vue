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

<script setup lang="ts" name="Person">  
    import {ref} from "vue" //响应式的加上ref
    let name = ref("张三") //外层加上ref表示是响应式的数据
    let age = ref(10)
    let address = "chengdu"
    let tel = "1999999999"

    console.log(name) //这里对象的类型就会发生改变
    console.log(age)
    console.log(tel)
    console.log(address)

    //写方法不传入参数
    function changeAge(){
        age.value += 1
        console.log(age.value)
    }
    function changeName(){
        name.value = "zhangsan"
        console.log(name.value)
    }
    function showTel(){
        alert(tel)
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