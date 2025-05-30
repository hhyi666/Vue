<template>
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看电话</button>
    </div>
</template>

<script>
export default {  //vue3的语法的实现
    name: "Person",
    
    //console.log  setup中的this是undefined Vue3中已经开始弱化this的作用了
    setup() {
        //数据
        //这些定义的都不是响应式数据
        let name = "张三" //注意此时的name不是响应式的变量
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
        return { //在这里能够交出去
            name,age,
            changeAge,
            changeName,
            showTel,
        }
        // return () => "吃辣审查" //可以返回函数，直接指定渲染的结果

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