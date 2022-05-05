### class-to-css-loader
该loader基于css的简化命名法：

当你在 vue/react 文件中写有`<div class="ml:10 fs:12 p:a" />hello<div>`时，这个div将自动获得：
```css
margin-left: 10px;
font-size: 12px;
position: absolute;
```
的样式！

### 工作原理
假设你有如下vue文件代码：
```html
// xxx.vue
  <div class="ml:10 fs:12 p:a" />hello<div>
```

经过该 loader 转换后，将生成如下代码：

```html
<div class="ml_s_10 fs_s_12 p_s_a">你好世界</div>
<style>
.ml_s_10 { margin-left: 10px; }
.fs_s_12 { font-size: 12px; }
.p_s_a { position: absolute; }
</style>
```
> 冒号会自动转换成`_s_`，因为css属性名不支持冒号。

### 使用方式
1、在 webpack.config 里进行配置：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'class-to-css-loader',
            options: {
              unit: 'px', // 使用的单位，rem 或 px, 默认 px。
            }
          }
        ],
      },
    ]
  },
}
```

### 解析对照表

|  css属性  |  简写key  |  例子  |
|  -  |  -  |  -  |
|  display  |  d  |  `d:n` => `display: none`  |
|  margin  |  m  |  `m:10` => `margin: 10px`  |
|  margin-top  |  mt  |  `mt:-10` => `margin-top: -10px`  |
|  padding  |  p  |  `p:2` => `padding: 2px`  |
|  padding-bottom  |  pb  |  `pb:5` => `padding-bottom: 5px`  |
|  float  |  f  |  `f:l` => `float: left`  |
|  overflow  |  of  |  `of:a` => `overflow: auto`  |
|  z-index  |  zi  |  `zi:10` => `z-index: 10`  |
|  border-color  |  bc  |  `bc:333` => `border-color: #333`  |
|  ...  |  ...  |  ...  |