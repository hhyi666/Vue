<template>
    <div class="person">
        <!-- 使用v-model能够进行双向绑定 -->
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        <button @click="changeName">修改全名</button><br>
        全名：<span>{{ fullName }}</span>
        <!-- 原则：模板里面尽量简单 -->
    </div>
    
</template>

<script setup lang="ts" name="Person">  
    import {ref,computed} from "vue"
    let firstName = ref("zhang")
    let lastName = ref("san")


    //这么定义的fullName是只可读的
    //function的方法是没有缓存的，但是使用computed使用可以进行缓存，当多次调用的时候直接从缓存里面拿就行（不需要多次调用）
    //多次调用只需要调用一次计算
    // let fullName = computed(() => { //计算属性 当数据发生变化就会重新计算
    //     return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1)+'-'+lastName.value
    // })
    let fullName = computed({
        get(){
            return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1)+'-'+lastName.value
        },
        set(val){
            console.log(val)
            const [str1,str2] = val.split("-")
            firstName.value = str1 //记得是对value及逆行修改
            lastName.value = str2
        }
    })
    function changeName(){
        fullName.value = "li-si" //这里没有修改东西 只是引起set的调用
    }
</script>
    
<style>
.person {
    background-color: skyblue;
    box-shadow: 10px;
    border-radius: 10px;
    padding: 10px;
}

</style>