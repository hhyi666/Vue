# watch

作用：监视数据的变化

特点：Vue3只能监视下面四种数据

参数：

1. 被监视的数据
2. 监视的回调
3. 配置对象（deep，immediate等等）

监听的类型：

- ref定义的数据
- reactive定义的数据
- 函数的返回值
- 一个包含上述内容的数组

## 情况一 ：监视ref定义基本数据

```ts
watch(sum,(newsum,oldsum) => {
    console.log(newsum,oldsum)
})
```

注意：

- 使用的时候不能加上value

- watch的返回值是一个函数，用来停止watch的监视

  ```ts
  const stopWatch = watch(sum,(newsum,oldsum) => {
      console.log(newsum,oldsum)
      if(newsum>=10){
          stopWatch()
      }
  })
  ```

  

## 情况二：监视ref定义的对象类型

```ts
watch(person,(newValue,oldValue) =>{
    console.log('person变化了')
    console.log(newValue,oldValue)

},{deep:true})
```

想要监听整个的变化，就需要使用deep进行全体的监视

后面还还可以添加immediate，一开始就会调用一次，但是old是undefined

注意：只有当地址进行变化的时候，我们的old和new不相同，当地址不发生改变的时候old和new就会一样 本质就是地址是否发生变化
修改的是ref定义对象的属性，new和old是一样的，因为是同一个对象
修改的是ref定义的整个对象，new和old不一样，不是同一个对象了

但是可能有性能的浪费或者我们只想监听特殊的属性

- 在第一个参数的地方，使用`() = > preson.name` 进行监听
- 多个参数的时候进行修改的时候，可以使用数组的形式进行监听
  监听每个数据的new和old

  ```ts
  watch(
    [
      () => person.value.name,
      () => person.value.age
    ],
    ([newName, newAge], [oldName, oldAge]) => {
      console.log('name 或 age 变化了:', newName, newAge);
    }
  );
  ```

- 替换整个对象

## 情况三：使用reactive监视的对象类型的数据

```ts
watch(person,(newValue,oldValue) =>{
    console.log('person变化了')
    console.log(newValue,oldValue)

})
```

reactive进行包裹的数据默认开启深度监听

隐式的开启深层的监听，并且是无法进行关闭的

## 情况四：监视ref或者reactive定义的对象类型的响应式数据中的某个属性(直接函数式)

- 如果该属性不是对象类型，需要写成函数的形式

- 如果该属性是对象类型，

  - 直接监听对象类型的时候，只能够监听单个的变化,可以监听细枝末节的地方，但是大方面监听不到

    ```ts
    watch(person.car,(newCar,oldCar) =>{
        console.log(newCar,oldCar)
    })
    ```

  - 可以直接编写，也可以写成函数的形式，建议写成函数式
    这样能够监听到整体得分改变，但是监听不到细枝末节的改变
    相当于监听地址值

    ```ts
    watch(() => person.car,(newCar,oldCar) =>{
        console.log(newCar,oldCar)
    })
    ```

  - 最终，我们可以使用函数式+deep就可以监听到所有的东西

    ```ts
    watch(() => person.car,(newCar,oldCar) =>{
        console.log(newCar,oldCar)
    }，{deep:true})
    ```

- 监视对象中属性，最好写函数式，注意：监视的对象需要关注内部的变化开deep就行

## 情况五：监视上述的多个数据

使用数组进行监听多个属性

```ts
watch([()=>person.name,() => person.car.c1],([newName,newCar],[oldName,oldCar]) => {
    console.log(newName,oldName)
    console.log(newCar,oldCar)
},{deep:true})
```



## watch配置参数的细节

- flush参数
  控制回调执行的时机（Vue3新增）

  - pre 在组件更新钱执行（默认）

  - post 在组件更新后执行

  - sync 同步执行（可能会有性能问题）

  - ```
    watch(person, () => {
      console.log('组件更新后执行');
    }, { flush: 'post' });
    ```

- onTrack和onTrigger调试钩子

  - 用于调试响应式依赖的追踪和触发

  - ```ts
    watch(person, () => {
      // 回调逻辑
    }, {
      onTrack(e) {
        console.log('依赖被追踪:', e);
      },
      onTrigger(e) {
        console.log('依赖被触发:', e);
      }
    });
    ```

- 在Vue3.5+可以使用deep+数字，表示最大遍历的深度，嵌套级数
  但是谨慎使用

## 使用reactive监听的特殊的限制

- 数组变更方法的响应式

  - 当reactive包裹数组的时候，使用Vue内置的变更方法（push，splice等）会触发响应式，但是直接修改索引不会

  - ```ts
    const arr = reactive([1, 2, 3]);
    watch(arr, () => {
      console.log('数组变化');
    });
    
    arr.push(4); // 触发监听
    arr[0] = 10; // 不触发监听（需通过 `Vue.set` 或 `arr.splice(0, 1, 10)` 修改）
    ```

- 新增属性的响应式问题

  - 直接为reactive对象添加属性不会触发响应式，使用Vue.set或者使用Object.assgin进行添加就会触发监听

    ```ts
    const person = reactive({ name: '张三' });
    watch(person, () => {
      console.log('person变化');
    });
    
    person.age = 18; // 不触发监听
    Vue.set(person, 'age', 18); // 触发监听
    ```



## watch监听的返回值

watch监听的返回值是一个函数用来取消watch监听，我们就可以在想要取消的时候进行调用取消监听

## 监听computed

可以直接监听到computed的返回的ref对象，响应式自动进行处理

## 监听的别的用法

监听DOM的修改，监听异步的操作修改状态等等



