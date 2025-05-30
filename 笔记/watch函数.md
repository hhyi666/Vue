## watch函数

监听一个或者多个函数

- 导入watch
- 执行watch函数要传入要侦听的响应式数据（ref对象）和回调函数

监听单个数据

```
  //监听num的变化 监听单个数据的变化
  //watch ref对象是不需要加上value属性
  watch(num,(newNum,oldNum) => {
    console.log(`num变化 ${oldNum} => ${newNum}`)
  })
```

监听多个数据

```
  watch( //使用数据进行记录 数组能够拿到新的旧值 还可以拿到新值
    [count,name] ,(
      [newCount,newName],[oldCount,oldName]
    ) => {
      console.log(`监听成功 ${oldCount} => ${newCount} ,${oldName} => ${newName} `)
    }
  )
```

### immdiate参数

在监听器创建时立即触发回调函数，响应式数据变化之后继续执行回调

会立即触发一次 对象类型的进行定义

```
  watch(count,() => {
    console.log("监听变化")
  },{
    immediate : true //一开始就会触发一次
  })
```

### deep参数

默认机制：通过watch监听的ref对象默认时浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep选项
尽量不开启deep选项

```
  watch(state,() => {
    console.log("监听修改")
  },{
    deep : true //能够监听深层次的嵌套的属性
  })
```

精确的监听对象的某个属性

```
 //实现精确的监听 就监听count的变化
  watch(
    () => state.value.count,
    () => console.log("count变化")
  )
  //deep有性能损耗，绝大多数尽量不开启deep
```

- 作为watch函数第一个对象 ref不需要添加.value
- watch可以监听多个数据
- 不开启deep 不能监听嵌套的改变
- 不开启deep 精确监听对下个你的变化 ，在第一个函数进行return就行

### flush选项

- 用来设置监听执行时机，可选值
  - 'pre' ；组将更行前执行
  - ‘post’ : 在组件执行之后执行
  - ‘sync’ ：同步执行（慎用，性能问题）

### 监听reactive对象

- 监听reactive对象的时候，需要通过 () => state.xxxx 使用，不能直接使用state.count进行监听
- 若直接监听reactive对象，即使不开启deep，也能监听顶层属性的变化，但是无法监听嵌套属性的变化

### watch的返回值

watch会返回一个函数，调用就能够停止监听

```
const stopWatch = watch(count, () => {
  console.log("count变化");
});

// 停止监听
stopWatch();
```







