# Pinia

Pinia是Vue最新的状态管理库，是vuex的状态管理工具的替代品

优势：

- 提供了更加简单的API（去掉了mutation）
- 提供了符合组合式风格的API（Vue3新语法统一）
- 去掉了 modules 的概念，每一个store都是一个独立的模块
- 搭配TS一起使用提供可靠的类型判断



注意：使用解构赋值的时候 需要使用 storeToRefs（只负责数据的解构赋值）进行包裹才能保证解构的值的响应式不会丢失，
但是函数方法不能这样使用 方法直接从原来的不使用上面的方法的对象直接就能拿到，使用storeToRefs包裹的方法使用解构赋值就不能拿到



### pinia的作用

集中的状态管理工具 新一代的vuex

### pinia还需要mutation吗

不需要 action支持同步和异步

### pinia 如何实现getter

使用computed进行模拟就行 使用计算属性函数

### pinia产生的store如何解构赋值数据保证响应式

storeToRefs使用 
但是函数方法的解构赋值不变







