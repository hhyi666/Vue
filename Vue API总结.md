# Vue API总结

## 一.全局API 

全局会使用到的API

### 应用实例

#### API

##### createApp() 

创建一个应用实例（CSR）

##### createSSRApp()

使用SSR的形式创建一个应用实例

- 二者的区别 渲染的模式和使用场景的不同
  - CSR	
    - 适合浏览器动态生成DOM
    - 适合传统单页面的加载
      - 后台管理 交互式web引用
      - 首次加载返回空的HTML 使用JS填充后续内容
  - SSR
    - 服务端进行渲染
    - 服务器先渲染HTML 发送到客户端进行激活
    - 提升加载速度 SEO友好
    - 配合后端i使用

##### mount() 

组件的挂载到一个容易元素中

##### unMount（）

 卸载已经挂载的应用实例

##### provide （）

提供一个值和能够在后代组件进行注入使用

##### component（） 

- 传递时组件的名字和定义 就是组件的注册
- 传递时一个名字 会返回和这个名字进行匹配的组件（名字的组件存在）

##### directive（）

- 传递的时名字+指令  注册是的就是全局的指令
- 只传递名字 返回相匹配的指令

##### use（） 

- 定义：安装插件
- 参数 ：
  - 组件本身
  - 传递给插件的选项

##### 其他

- 插件可以是一个install（）方法的对象|函数

  ```ts
  import SvgIcon from '@/components/SvgIcon/index.vue'
  const allGlobalComponent:any = {SvgIcon}
  export default{
      install(app:any){
          Object.keys(allGlobalComponent).forEach((key) => {
              app.component(key,allGlobalComponent[key])
          })
      }
  }
  ```

  这个传过去 install里面的东西就会进行注册 

  可以设置全部的全局component设置一个出口 index 直接一起进行注册

- 对同一个插件多次使用时只会注册一次

##### mixin（）

- 定义
  - 应用一个全局组件mixin
  - 会作用于应用中的每个组件的实例
  - 和选项式APId写法非常像
  - V3使用的很少 V3直接使用CompositiionAPI

#### 方法

##### app.version

 版本 主要时插件的使用需要用到

##### app.config 

每个应用实例=都会暴露config对象 包含属性的配置

- 在挂载应用前可以进行更改

##### app.config.errorHandler 

- 定义
  - 用于应用内抛出“未能捕获的错误”指定一个全局处理函数
- 接收参数
  - 错误的对象err
  - 触发错误获得的组件的实例 instance
  - 指出错误来源的info字符串
- 捕获错误的位置
  - 组件渲染器
  - 时间处理器
  - 声明周期钩子
  - setup函数当中
  - 侦听器
  - 。。。。

##### app.config.warmHandler

- 定义
  - 和上面的差不多 就是处理警告的函数
- 参数
  - msg 错误的信息
  - instance 组件实例
  - trace 组件追踪的字符串
- 注意：开发环境阶段会显示

##### app.config.performance 

- 浏览开发者工具时间线的是时候 对组件进行初始化，编译，渲染，修补的性能进行追踪

##### app.config.complerOptions 

- 配置运行的时候编译器的选项

### 通用API

#### version

 暴露使用Vue的版本

#### nextTick()

 用来等待下一次DOM的更新和刷新后执行的回调函数

- 更数数据之后立即能够拿到DOM
- 拿到最新更改的数据
- 需要确保在DOM更新之后再执行操作
- 执行的时机
  - 数据变更
  - Vue异步缓冲
  - 虚拟DOM对比渲染真实的DOM
  - nextTick回调执行
- 和watch相比 更加直接拿到DOM元素

#### defineComponent()

 定义Vue组件时 提供类型推导的辅助函数

#### defineAsyncComponent（） 

- 定义一个异步组件，使用这个函数时，组件加载的时候时懒加载的
- 参数可以是一个异步的函数，或者对加载的行为进行更加具体定制的一个选项对象
- 低频使用的组件进行懒加载
- 参数的形式
  - 直接传输加载的异步函数 实现更加精细的控制
- 解决首屏加载性能的问题

#### defineCustomElement() 

- 将组件直接编译成原生的自定义元素 可以在非Vue（纯HTML，React等）的情况下使用
- 在传统的项目中嵌入Vue组件
- 开发跨框架的复用的UI组件
- 在任何Web的框架中都可以进行使用
- 解决生态的隔离的问题

## 二.组合式API

### setup

- 基本使用
  - 选项式API `setup{}`
  - 组合式API `<script setup> `
- 访问props 
  - setup的第一个参数（传统）
  - 如果要对props对象进行结构 记得使用toRefs 或者 toRef
- setup的上下文
  - setup的第二个参数（传统）
  - context.xxx(attrs,slots,emit,expose)
- 直接使用deifineProps进行参数的接收
- 和 渲染的函数一起使用
  - 函数渲染的模板组件
  - 外部方法不能暴露给父组件进行使用，这个时候可以使用expose（自定义父组件可以访问的东西）进行操作
  - expose父组件使用ref进行绑定子组件的实例就可以对子组件的方法和数据进行访问

### 响应式：核心

- 核心的API	
  - ref
    - 基本数据类型
    - ref里面包裹了对象 这个对象被理解成深层解包 可以使用`shallowRef()`解决
    - reactive里面嵌套ref
      - 对象中的部分的属性需要进行独立的控制
        - 注意嵌套在里面会自动的解包 不需要再次使用value拿到数据
      - 动态的管理响应式对象
      - 能够保持响应式 
        - 无论直接操作ref还是使用reactive操作都不会失去响应式
      - 注意：
        - 数组或者map中的ref不会自动的进行解包
        - ts能够自动自动的推断类型
- computed（） 
  - 只读 
    - 接收一个getter函数 返回一个只读的响应式ref对象
  - 可写
    - 接收一个带有get和set函数的对象，创建一个可写的ref对象
- reactive
  - 响应式是深层的，影响到所有的嵌套的属性
  - 访问到数组|Map 的ref包裹的不会自动解包
  - 使用`shallowReactive()` 只对表层的进行处理
- readonly（）
  - 接收一个对象 返回一个原值的只读代理
  - 只读代理是深层的 ，对任何嵌套的属性的访问都i是只读的
  - 使用shallow避免对深层的转换行为

### watch API

- watchEffect
  - 使用flush控制执行的时机
    - pre 前 （默认）
    - sync 后
    - post 同步
  - 接收两个参数 
    - 运行是的副作用函数 注册和清理回调
    - 可选项 调整副作用的刷新时机或者调试副作用的依赖，返回值是一个停止副作用的函数
- watchPosteffect 
  - 使用flush：‘post’ 的别名
  - eg：访问更新之后的DOM
- watchSyncEffect（）
  - 同步的监听响应数据的变化
- watch（）
  - 侦听一个或者多个响应式数据源，并在数据源发生变化的时候回调函数
  - 参数
    - 监听的数据
    - 变化回调函数
    - 可选参数 
      - immdiatee（立即执行） ，deep（监听深层次） ，flush（回调执行的时机）， 。。。参数
      - 精细的控制行为

### 响应式：工具函数

- isRef 检查是不是ref
- unref（） 是ref返回内部的值 不是返回参数本身
- toRef()  响应对象Object 针对的是某一个响应式对象的属性prop
  - 需要单独的属性保持响应式
  - 转换成独立的ref
- toRefs（） 针对的是整个对象的所有属性，目标是将响应式对象（reacive转化成普通的对象）
  - 普通对象里面每一个prop都是ref
  - 用于想要在合成函数中返回响应式对象
  - 解构响应式对象的时候保证响应式
- 下面的三个使用的较少 作用也比较简单
- isProxy 检查一个对象是不是由reactive readonly shallowReactive或者shallowReadonly进行创建的代理
- isReactive
- siReadonly 

### 响应式：进阶

- shallowRef（）

  - ref的浅层的解析作用
  - 内部的值将会原样存储和暴露并且不会深层递归转化成响应式
  - 场景
    - 对大型数据结构性能优化

- triggerRef（）需要使用手动的触发

  - 直接修改shallowRef的深层属性时，手动通知Vue触发相关的副作用（watch或者模板的更新）
  - 仅针对shallowRef 对普通ref没有作用
    - 深度修改shallowRef的内部值
    - 优化性能避免深度响应式

- customRef 

  - 完全自定义ref的行为，适合需要精细的控制依赖追踪（track）和更新触发（trigger）

    - 自由的决定追踪和触发
    - track（）标记要追踪的依赖（注意！！！监听这个元素）
      - get()调用
    - trigger（）通知依赖此ref的副作用更新（就是通知发生变化了）
      - set（） 值发生变化的之后调用

  - ```ts
    import { customRef } from 'vue';
    
    const myCustomRef = customRef((track, trigger) => ({
      get() {
        track(); // 声明依赖追踪
        return _value; // 返回当前值
      },
      set(newValue) {
        _value = newValue; // 更新值
        trigger(); // 触发更新
      }
    }));
    ```

  - 实现防抖ref 

    - 实现一个修改值后500ms触发更新的ref

      ```ts
      function useDebouncedRef(initialValue, delay = 500) {
        let timeout;
        return customRef((track, trigger) => ({
          get() {
            track();
            return initialValue;
          },
          set(newValue) {
            clearTimeout(timeout); // 清除之前的定时器
            timeout = setTimeout(() => {
              initialValue = newValue;
              trigger(); // 延迟触发更新
            }, delay);
          }
        }));
      }
      ```

      

- shallowReactive（）

  - reactive的浅层作用
  - 没有深层次的转换，只有根级别是响应式的
  - ref的值不会自动解包了

- shallowReadonly 浅层的只读属性 不会自动解包

- toRaw（） 

  - 传入响应式对象
  - 返回对应的原始普通的对象（不具有响应式）
  - 场景
    - 使用于临时的读取 不会引起代理访问/追踪
    - 可以写入而不触发更改（监听）的特殊方法
  - 注意：不建议对原始对象的持久引用，注意谨慎使用

- markRow()

  - 将一个对象标记成不可转为代理，返回对象的本身
  - 不能让对象具有响应式的功能
  - 使用的时候能让你在状态关系中嵌入原始的，非代理的对象

- scope使用的很少

- effectScope（）

  - 集中管理一组响应式的副作用
  - 或者用来隔离副作用进行测试
  - 处理所创建的响应式的副作用和侦听器（watch）和计算属性之类的

- getCurrentScope（）

  - 返回当前的活跃的effect作用域

- onScopeDispose() 

  - 当前的活跃的effect作用域上，注册返回一个处理回调的函数
  - 当相关的函数effect作用域停止的时候们将会调用上述的函数
  - 可以作为【onUnmounted】的替代品

### 生命周期钩子（大部分经常用的就不过多赘述）

- 常用的钩子
  - onMounted
  - onUpdated
    - 注意：
      - 不要再这个钩子里面更改组件的状态，可能会导致无限更新
      - 如果只是需要在某个特定的状态更改之后访问更新之后的DOM 直接使用nextTick就行
  - onUnmounted
    - 卸载的情况
      - 所有的组件已经被卸载
      - 所有的相关的响应式作用都已经停止
        - 渲染作用
        - setup创建的时候的计算属性和侦听器
  - onBeforeUpdate
    - 场景
      - 在Vue更新DOM之前先访问DOM状态
      - 服务器渲染期间不会进行调用
  - onBeforeUnmount
    - 注意
      - 钩子被调用的时候，组件实例依然还保有全部的功能
      - 这个钩子在服务器渲染期间不会被调用
      - 服务器渲染期间
        - 就是服务端构建HTML发送给客户端的过程（而非客户端动态渲染）
      - 后面两个就是在客户端激活之后调用
- 其他的钩子
  - onErrorCaptured 注册一个钩子，在捕获后代组件传递的错误时候进行调用
    - 捕获错误的来源
      - 组件渲染 事件处理器 生命周期钩子 setup函数
      - 侦听器 自定义指令钩子 过渡钩子
    - 钩子携带的参数
      - 错误的对象
      - 触发错误的组件实例
      - 说明错误来源的信息字符串
    - 隔离组件 捕获错误 防止错误的冒泡
    - 专门处理组件数内部的错误来源
  - 错误的传递规则
    - 所有的错误都会通过app.confg.errorHandler （前提是已经被定义）
    - 如果组件的继承链或者组件链上存在多个errorCapture的钩子 且他们针对的是同一个错误，那么他们将会从底向上的顺序进行调用，这个过程是“向上传递” 类似于DOM事件
    - 可以通过return false的形式阻止错误向上传递
  - onRenderTracked() 
    - 注册i一个钩子来追踪响应式的依赖
    - 开发模式进行使用
  - onRenderTriggered（）
    - 注册一个调试钩子
    - 开发模式进行使用
  - onActived() 
    - 注册一个回调函数 
      - 如果组件实例时<keepAlive>缓存树的一部分，那么组件插入到DOM当中时进行调用
      - 服务器渲染期间不会进行调用
  - onDeactived（）
    - 和上面的钩子正好相反
  - onServePrefetch（）（SSR）
    - 注册一个异步函数，当组件实例在服务器上被渲染之前进行调用
    - 返回的时Promise会等到Promise完成 渲染这个组件

### 依赖注入

可以实现祖先组件和后代组件之间的通信

适合解决多层组件的嵌套问题或者兄弟组件直接数据传递的问题 实现共享

#### provide

- 定义
  - 提供一个值 可以被后代组件注入
  - 接收两个参数 
    - key 可以是字符串或者Symbol
    - 和即将注入的值value
  - 关于类型
    - 使用TS的时候，key可以是一个被类型断言为injectionKey
    - injectionKey是一个 Vue提供的工具的类型 继承Symbol 可以用来同步provide（）和inject（）直接值类型
  - 使用方式
    - 在setup中直接进行同步调用，和注册生命周期的钩子类似

#### inject

- 定义
  - 注入一个由祖先组件或者整个应用（通过app.provide()形式）提供的值
  - 接收两个参数
    - 注入的key，如果未能通过key的匹配到具体的值，将返回undefiend，除非赋予初始值
    - 可选值 
      - 默认值
      - 工厂函数
      - 默认值本身就是一个函数，将false作为第三个参数传入，表明这个函数就是默认值

#### 使用场景

- 跨多层组件共享数据
- 共享方法或服务
- TS类型安全
  - 提供实时同步类型
  - inject的时候自动推断类型
- 全局配置管理
- 复用工具方法
- 性能优化
  - 避免多层次的嵌套
- 实现父组件对子组件的控制



## 三.选项式API（使用较少）

## 四.内置内容

指令 组件 特殊的元素element和特殊属性attributes

基本使用很多 较为常见的就是 v-if 进行组件的展示

v-model v-on v-for 等指令 使用频率高 

### 指令

- v-text

  - 更新元素的文本内容
  - 类似文本插值 `<span>{{msg}}</span>`

- v-html

  - 更新元素的innerHtml
  - 容易造成xss攻击，不公开内容不使用这个

- v-show

  - 基于表达式中值的真假性 改变元素的可见性
  - css实现的display:none

- 下面的三个 是基于表达式的真假，判断渲染出哪一个模板 任何一个被触发时，元素所包含的指令/组件会销毁和重构（性能的影响）

  - v-if
  - v-else
  - v-else-if

- v-for 注意这里和v-if一起使用的时候v-if的优先更高 不建议一起使用

- v-on 缩写就是熟悉的@ 

  - 修饰符

    - .stop .prevent .capture。。。

    - 加载@的后面

    - |     **修饰符**     |                           **作用**                           |             **示例**             |
      | :----------------: | :----------------------------------------------------------: | :------------------------------: |
      |    **`.stop`**     |      阻止事件冒泡（相当于 `event.stopPropagation()`）。      |   `@click.stop="handleClick"`    |
      |   **`.prevent`**   |      阻止默认行为（相当于 `event.preventDefault()`）。       | `@submit.prevent="handleSubmit"` |
      |   **`.capture`**   |          使用事件捕获模式（而非冒泡模式）监听事件。          |  `@click.capture="handleClick"`  |
      |    **`.self`**     | 仅当事件是从当前元素本身触发时才回调（忽略子元素触发的事件）。 |   `@click.self="handleClick"`    |
      |    **`.once`**     |            事件只触发一次（触发后自动移除监听）。            |   `@click.once="handleClick"`    |
      |   **`.passive`**   | 以 `{ passive: true }` 模式添加监听器，优化滚动性能（移动端常用）。 | `@scroll.passive="handleScroll"` |
      |   **按键修饰符**   |       监听特定按键（如 `.enter`、`.esc`、`.space`）。        |   `@keyup.enter="submitForm"`    |
      | **鼠标按键修饰符** |        限定鼠标按键（`.left`、`.right`、`.middle`）。        |    `@click.right="showMenu"`     |

- v-bind
  - 动态的绑定一个或者多个attribute 也可以是组件的prop
  - 就是相当于使用：
- v-model
  - 实现双向绑定
  - 限定使用范围
    - input select textarea component
    - 注意 
      - el-input 不使用双向绑定不会有输入
    - 修饰符
      - .lazy 监听change
        - 不是立马进行更新 而是通过操作之后才会进行更新 比如通过失去焦点或者回车之类的
      - .number 转换数字
      - .trim 移除空格
- v-solt
  - 声明具名插槽
  - 期望接收props作用域插槽
  - 直接使用# 就行缩写就行
  - 使用范围
    - template 
    - components
- v-pre
  - 跳过该元素以及所有子元素的编译
  - 无需传入任何参数
  - 和Vue模板相关的语法都会进行保留
- v-once
  - 仅仅渲染一次
- v-clock
  - 隐藏没有完成编译的模板，主要是常用于首页加载出现白屏的问题
  - 在没有进行构建的时候使用
  - 可以在组件编译完成钱 隐藏原始的模板

### 组件

- <Transition>

  - 给单个元素提供动画的效果
  - 具有属性和事件

- <TransitionGroup> 

  - 为多个列表或者元素提供动画效果
  - 注意：每个节点要有自己独立的key才能正常的工作
  - 默认的情况下，不会渲染一个容器的DOM元素但是可以通过tag这个属性启用
  - 可以和FLIP动画技术结合使用
  - 每个子元素设置自己的Key

- <keepAlive>

  - 动态的切换组件 缓存的动态切换的组件（标签页）避免重复的进行渲染
  - 参数
    - include  渲染的组件
    - exclude 排除特定的组件
    - max 最大缓存实例个数

- <Teleport>

  - 跨DOM进行渲染
  - 将组件的内容挂载到任意的DOM的节点上（全局弹窗等）
  - 直接使用to=名字就能渲染到对应的DOM元素上
  - 全局UI的控制

- <Suspense>

  - 异步加载状态

  - 处理异步组件的加载的等待状态

  - 优化加载体验

  - ```ts
    <suspense>
      <template #default>       <!-- 主内容 -->
        <AsyncComponent />      <!-- 异步组件（如 `defineAsyncComponent` 加载） -->
      </template>
      <template #fallback>      <!-- 加载中状态 -->
        <div>Loading...</div>
      </template>
    </suspense>
    ```

## 五.单文件组件

### 基本东西

一个Vue单文件组件（SFC）通常使用.vue作为文件的扩展名

三个语言块的使用

### 自定义语言块

### 自动名称推导 

文件名字不需要全部写出来

### 预处理器 lang

### 组件的使用

### 动态组件

### 递归组件

### 命名空间组件

设置一个共同的组件出口就行

### await顶层

会被编译成async setup()进行使用

但是需要和suspense配合使用

### 使用宏函数

define等等

### Css功能

#### Css的作用域

### Css Modules 

- 使用方式 `<style module></style>`
- 将css哈希化  只能作用于当前的组件
  - module可以自定义组件的名称 和组合式API一起使用

### Css当中的v-bind

使用v-bind连接到script setup中的某个动态变量 

## 六.进阶API

上面的已经能够解决大部分的问题

下面的主要是设置定制化的场景

下面的东西还没有涉及到就先不进行总结了 /(ㄒoㄒ)/~~ /(ㄒoㄒ)/~~

等我了解之后再去把这一part补上

下面的图是网上看到的图直接搬过来了

