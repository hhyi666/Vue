# shallRefs和shallReactive

## shallRef 

- 作用：创建一个响应式对象，但是只对顶层的数据进行响应式处理

- 用法：

  - ```
    let shall = shallRef(数据)
    ```

- 特点：只追踪引用值的变化，不关心值内部属性的变化

## shallReactive 

- 作用：创建一个浅层次的响应式对象，只会将对象的最顶层的属性变成响应式的，对象的内部属性不会变成响应式的
- 特点：对象的顶层属性是响应式的，但是嵌套的属性不是’

- 总结：
  - 能够绕开深度响应，浅层式的API创建的状态只能在顶层创建响应式，对深层次的对象是不进行处理的
  - 避免产生性能的损耗，使得访问的速度更快

# readonly和shallReadonly

## readonly

只读属性

不能对值进行修改 

使用的时候 使用 readonly进行包裹原来的数据|对象  这样创建新的只能读取的内容

创建深只读副本 使用readonly进行原来数据的包裹

特点：

- 所有的嵌套属性都是只读的副本
- 修改的时候会做出警告

应用场景

- 创建一个不可变的状态快照
- 保护全局状态配置不被修改

## shallReaonly

和readonly相似

只能作用于对象的顶层属性

深层次的还是可以进行修改

# toRaw和markRaw

## toRaw

用来获取一个响应式对象的原始对象，toRaw返回的对象不再是响应式，不会触发视图的更新

不会引起对象的代理追踪，不会引起代理访问和额外的开销，不建议长时间的使用

在需要将响应式的对象传递给非Vue外部的库或者外部系统的时候，使用toRaw可以确保接收到的是普通的对象

```ts
let person2 = toRaw(person)
```

## markRaw

标记一个对象，永远不会成为响应式 预防作用

例如我们使用mockjs的时候，为了防止mockjs变成响应式的对象，可以使用markRaw区标记mockjs

使用的时候直接进行包裹就行

# customRef

创建一个自定义的ref 并对其依赖项进行跟踪和更新，触发进行逻辑控制

自定义ref

就是在原生的ref能够加上自己的逻辑

这个操作一般们都是封装在一个文件当中，直接导出函数 对象进行使用

一般有 track() 和 trigger() 两个参数 二者缺一不可

track函数可以就是告诉Vue 这个数据很重要，重点监听变化

trigger就是 通知Vue 数发生变化

自定义设置 访问和改变值的时候操作的代码逻辑

```ts
import { customRef } from 'vue';

//需求 延迟更新怎么做到？
//默认的ref无法实现
export default function (initValue:string,delay:number) {
    //track 跟踪
    //trigger 触发
    let timer: number
    let message = customRef((track, trigger) => {
        return {
            //message被读取的时进行调用
            get() {
                track() //告诉Vue message很重要 要对message持续的关注 一旦message变化就进行更新
                return initValue
            },
            //message被修改的时候进行调用
            set(value) {
                clearTimeout(timer) //清除原来的定时器
                //设置延时执行
                timer = setTimeout(() => {
                    initValue = value
                    trigger() //通知Vue数据message变化
                }, delay)
            },
        }
    })
    return {message}
}
```





