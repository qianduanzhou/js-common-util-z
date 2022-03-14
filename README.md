# 前端常用方法库

## MakeDomMove

这个方法可以让元素根据鼠标按下后拖拽移动，传入2个必填和一个选填参数。

1. 第一个必填参数是父元素，可以传字符串如.father或者传dom，如果传null或false则默认为body。
2. 第二个必填参数为子元素，即可以拖拽移动的元素，方式和父元素一样。
3. 第三个选填参数为其他选项，可以传一个对象，对象里面有isLazy和waitTime两个字段，即是否开启节流和节流时间。

生成的实例有两个方法makeMove和clear，makeMove即开启拖拽移动功能，clear则是清除相关事件。

### 使用

```js
import { MakeDomMove } from 'zhb-common-utils';
let m = new MakeDomMove('.father', '.child', {isLazy: true, waitTime: 200});//初始化
m.makeMove();//使用
m.clear();//清除事件
```

## debounce

这个方法是防抖方法，传入3个参数。

1. 第一个为执行的函数。
2. 第二个为等待的时间。
3. 第三个为是否立即执行

### 使用

```js
import { debounce } from 'zhb-common-utils';
document.addEventListener('mousemove', debounce(function(e){}, 200, false)): 
```

## throttle

这个方法是节流方法，传入3个参数。

1. 第一个为执行的函数。
2. 第二个为等待的时间。
3. 第三个是一个对象，有两个参数， trailing结束后是否执行一次 leading是否立即执行

### 使用

```js
import { throttle } from 'zhb-common-utils';
document.addEventListener('mousemove', throttle(function(e){}, 200, {trailing: false, leading: false})): 
```

