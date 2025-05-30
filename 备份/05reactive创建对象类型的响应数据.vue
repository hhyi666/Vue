<template>
    <div class="person">
        <h2>一辆{{car.brand}}车，价值：{{ car.price }}</h2>
        <button @click="changePrice">修改价格</button>
        <h2>游戏列表：</h2>
        <ul>
            <!-- v-for 形参 + in + 数据源 -->
            <li v-for="order in games" :key="order.id">{{ order.name }}</li>
        </ul>
        <button @click="changeName">修改第一个游戏的名字</button>
        <hr>
        <div>测试：{{ obj.a.b.c }}</div>
        <button @click="test">测试</button>
    </div>
    
</template>

<script setup lang="ts" name="Person">  

    import {reactive} from "vue"
    //数据 使用reactive实现响应式数据 进行数据的包裹
    //包裹的对象就是响应式数据 进行代理的数据
    let car = reactive({
        brand : "奔驰",
        price : 100,
    })   

    //使用reactive定义数组对象的类型
    let games = reactive([
        {id : "01",name:"王者荣耀"},
        {id : "02",name:"csgo"},
        {id : "01",name:"瓦罗兰特"}
    ])

    let obj = reactive({
        a : {
            b : {
                c : "666"
            }
        }
    })
    console.log(car) //变成proxy对象
    function changePrice(){
        car.price += 100 //这样写不是响应式
        console.log(car.price)
    }

    function changeName(){
        games[0].name = "愿神"
    }

    function test(){
        obj.a.b.c = "999"
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