# Pinia

Pinia是Vue最新的状态管理库，是vuex的状态管理工具的替代品

符合直觉的Vue.js管理库

优势：

- 提供了更加简单的API（去掉了mutation）
- 提供了符合组合式风格的API（Vue3新语法统一）
- 去掉了 modules 的概念，每一个store都是一个独立的模块
- 搭配TS一起使用提供可靠的类型判断



注意：使用解构赋值的时候 需要使用 storeToRefs（只负责数据的解构赋值）进行包裹才能保证解构的值的响应式不会丢失，
但是函数方法不能这样使用 方法直接从原来的不使用上面的方法的对象直接就能拿到，使用storeToRefs包裹的方法使用解构赋值就不能拿到

集中式状态管理
一份数据多地方使用 
考虑使用集中的状态管理

### pinia的作用

集中的状态管理工具 新一代的vuex

### pinia还需要mutation吗

不需要 action支持同步和异步

### pinia 如何实现getter

使用computed进行模拟就行 使用计算属性函数

### pinia产生的store如何解构赋值数据保证响应式

storeToRefs使用 
但是函数方法的解构赋值不变



### Pinia中的 storeToRefs

使用这个函数，可以直接对里面的数据进行ref包裹，并且对方法不进行ref包裹，提高性能，

使用toRefs也能实现这样的操作，但是全部的数据和方法都会ref包裹 尽量不使用



### getters

对Pinia中的数据不满意

设置getters可以对数据进行自己的定义 在store中进行配置

后续直接引入使用就行

```
    getters:{
        bigSum(state){
            return state.sum*10 //使用this也行
        },
        upperSchool(state){
            return state.talk.toUpperCase()
        }
    }
```



### Pinia中的subcribe的用法

类似于watch的用法 直接使用就行

能够监听数据的变化

```
LoveTalk.$subscribe((mutate,state)=>{ //和watch很像
    console.log('LoveTalk 保存的数据发生变化')
    console.log(mutate,state) //state拿到对应的数据
})
```

### 组合式的写法（好用）

就和正常的写函数差不多 组合式清晰一点

```ts
import { reactive } from "vue";
export const useTalkStore = defineStore('talk', () => {
    const talkList = reactive([
        { id: '01', title: '今天天气不错' },
        { id: '02', title: '今天很想你' },
        { id: '03', title: '今天吃什么' },
    ])
    async function getTalk() {
        //发请求 下面的写法是连续的解构赋值+重命名
        let { data: { title } } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
        //将请求包装成一个对象
        let obj = { id: nanoid(), title: title }
        talkList.unshift(obj)
    }
    return {
        talkList,
        getTalk,
    }
})
```

### pinia中的插件机制

允许扩展每个store中的功能，例如实现全局状态持久化，日志记录等

插件的创建和使用 记得使用插件的时候要注册插件

```ts
// 示例：创建一个简单的日志插件
const piniaLogger = (context) => {
  const { store } = context;
  // 监听所有状态变化
  store.$subscribe((mutation, state) => {
    console.log(`[Pinia] ${mutation.type} on ${store.$id}`, state);
  });
  // 扩展 store 方法
  store.$reset = () => {
    console.log(`Resetting store: ${store.$id}`);
    store.$patch(store.$state);
  };
};

// 在创建 pinia 实例时使用插件
const pinia = createPinia().use(piniaLogger);
```

### 状态的持久化

使用 `pinia-plugin-persistedstate` 插件可以实现状态的持久化（本地的存储）

注意：这个也是一个插件，需要在使用之前对插件使用use进行注册

然后在pinia中添加配置 persist：true开启持久化存储

这个存储也可以自定义进行配置

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null
  }),
  persist: true, // 全部状态持久化
  // 或者自定义配置
  persist: {
    key: 'auth-data',
    storage: localStorage,
    paths: ['token'] // 只持久化 token
  }
});
```



### Action错误的处理和Loading状态

复杂的应用中，使用异步请求和加载状态时常见需求，pinia可以通过封装统一的错误处理逻辑

使用trycatch可以捕捉到错误 封装统一的错误处理逻辑

最后可以设置loading的状态



### 跨store的访问和组合

直接在最上面进行引入，在代码中使用就行

```ts
import { useUserStore } from './user';

export const usePostStore = defineStore('posts', {
  actions: {
    async fetchUserPosts() {
      const userStore = useUserStore();
      const userId = userStore.userId;
      // 使用另一个 store 的数据发起请求
      const posts = await fetch(`/api/users/${userId}/posts`);
      return posts;
    }
  }
});
```



### 动态模块的注册和卸载

可能含有多个模块，我们不需要的时候我们希望不进行加载，用户进行访问的时候才进行动态的注册插件，减少初始加载的时间

插件的运行的时候可能需要动态的注入store

```ts
// 动态注册 Store
const pinia = createPinia();
app.use(pinia);

// 之后注册新 store
const useDynamicStore = defineStore('dynamic', {
  state: () => ({ count: 0 })
});

// 手动注册
useDynamicStore(pinia);

// 卸载 Store（清除状态）
pinia.uninstall();
```

