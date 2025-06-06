import {createApp} from 'vue'
import App from './App.vue'
import hello from './Hello.vue'

// 创建应用
const app = createApp(App)
app.component('hello',hello)
//进行组件的注册

app.config.globalProperties.x = 99
declare module 'vue'{
    interface ComponentCustomProperties{
        x :  number
    }
}
//注册全局指令
app.directive('beauty',(element,{value}) => {
    element.innerText += value
    element.style.color = 'green'
    element.style.backgroundColor = 'yellow'
})

// 挂载应用
app.mount('#app')

