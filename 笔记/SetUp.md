## setup 和 data methods之间有什么关系

- 这几个能够一起使用（同时存在），但是不建议
- data和methods能够拿到setup中的数据
- data和methods中能够使用this. 拿到setup中的数据
- 但是setup中的写法，拿不到data methods中的数据
- setup中不能使用this



## setup的语法糖

- 直接使用scripit进行设想要传出去setup中的值

  ```
  <script lang="ts">
      export default {  //vue3的语法的实现
          name: "Person",
      }
  </script>
  
  <script setup lang="ts">  
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
  ```

- 如果我们简单一点，就下载一个插件并引用，这样就不需要写export中的东西

  ```
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
  ```

- 插件：

  - ```
    npm i npm i vite-plugin-vue-setup-extend -D
    ```

  - 然后再vite.config.ts中进行引用就行

    ```
    import VueSetUpExtend from "vite-plugin-vue-setup-extend"
    VueSetUpExtend()
    ```

## setup选项写法和执行时机

- setup的执行时机

  - beforeCreate钩子执行之前 自动执行

- setup写代码的特点

  - 内部写函数和变量
  - 以对象的形式return出去

- <script setup>  语法糖
  	//经过语法糖的封装更简单的API的调用
  </script>

- setup 中的this还指向组件实例吗

  - 指向undefined
