# defineprops

## 作用

当我们希望所有的东西共享相同的视觉布局，但是具有不同的内容，这时我们就需要像组件中传递数据，就需要使用Props操作

使用defineProps的时候是一个仅仅在setup中才能后进行引用的，而且不需要显式的导入，会自动的创建

defineProps会返回一个参数，具有对象类型，能够拿到对应的数据

## 使用

使用简单接收就是

```
defineProps(['title'])
const props = defineProps(['title'])
console.log(props.title)
```

一个组件可以有任意多的props，默认情况下接收所有的类型的值，

注意：传递给defineProps的参数和提供给props的值是相同的，两种声明背后都是使用的props选项

除了使用字符串数组【】 之外，还能使用对象的形式进行声明
一个是名称，一个是类型

```
defineProps({
	title:string,
	likes : Number
})
```

对象类型的写法 运行时声明

```
defineProps({
  bar: {
    type: Number,
    default: 0 // 直接设置默认值
  }
})

//对象类型添加限制
defineProps({
  person: {
    type: Object as PropType<{
      name: string;
      age?: number;
      hobbies: string[];
    }>,
    required: true
  }
})
```

- 适用设置默认值
- 运行的时候类型的验证
- 需要定义复杂的props
- 需要使用validtor函数
  - 自定义验证函数，可以对传过来的值进行验证 验证失败的时候会抛出错误
  - 并且是同步函数，不支持异步验证

泛型的写法 这种被称为基于类型的声明

```ts
// 自动推导为 Readonly<string>
const props = defineProps<{
  foo: string
}>()

props.foo // 类型为 string，只读
//限制接收类型
define<{list:Persons}>() //Person是设置的类型


//接收list + 限制类型 + 限制必要性 + 指定默认值（需要是函数的形式）
withDefaults(defineProps<{personlist?:Persons}>(),{
    //设置默认值
    personlist : () => [{id:'123342',name:'康师傅',age:10}]
})
//或者使用 结构赋值的形式来设置默认值
const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Person>()
```

- 只是需要简单的类型检查
- 不需要默认值或复杂验证
- 追求代码的简洁性

个人感觉直接使用对象类型的设置方式就行

设置类型，默认值都比较方便