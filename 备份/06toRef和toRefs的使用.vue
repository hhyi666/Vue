<template>
    <div class="person">
        <div>姓名：{{ person.name }}</div>
        <div>年龄：{{ person.age }},{{ nl }}</div>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
    </div>
    
</template>

<script setup lang="ts" name="Person">  

    import {reactive,toRefs,toRef} from "vue"
    import {ref} from "vue"

    let person = reactive({
        name : "张三",
        age : 10,
    })

    //加上 toRefs 就能成为 ref引用的对象
    let {name,age} = toRefs(person) //将使用reavtive创建的对象转换成使用ref包着的对象，里面的数据也是响应式的数据
    //就可以直接使用name对person.name 就行修改
    //使用toRefs就能直接进行改变

    let nl = toRef(person,"age")
    console.log(nl.value)
    function changeName(){
        name.value += "~" 
        console.log(name.value) 
    }
    function changeAge(){
        age.value += 1
        console.log(age.value)
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