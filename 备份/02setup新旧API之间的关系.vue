<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看电话</button>
        <hr>
        <div>{{ a }}</div>
        <div>{{ c }}</div>
        <button @click="b">测试</button>
    </div>
</template>

<script>
export default {  //vue3的语法的实现
    name: "Person",
    data(){
        return {
            a : 100,
            c :this.name
        }
    },
    methods : {
        b(){
            console.log('B')
        }
    },
    setup() {
        let name = "张三" 
        let age = 10 
        let tel = "1213232"

        //方法
        function changeName(name) {
            console.log("01")
            name = "zhangsan - 01" //这样进行修改页面是不会变化的
            console.log(name)  //name是改变的，但是不会进行更改
        }
        function changeAge(age){
            console.log("02")
            age += 1
        }
        function showTel(){
            console.log("03")
            alert(tel)
        }
        return {
            name,age,
            changeAge,
            changeName,
            showTel,
        }
    }
}
</script>

<style>
.person {
    background-color: gray;
    box-shadow: 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin: 0 10px;
}
</style>