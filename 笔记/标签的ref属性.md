# ref属性

对html标签添加ref属性对应的是拿到数据的变量，这样就能拿到对应的数据

但是当ref标签加到组件的属性上，这时会触发保护措施，我们不能访问组件的数据
拿到的是组件的实例对象

我们可以使用defineProps来展示可以展示的数据，就是暴露数据
（用来后面的子传父操作的实现）