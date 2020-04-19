### class-to-css-loader
该loader基于css的简化命名法：
![](https://upload-images.jianshu.io/upload_images/4328038-5c8f39b0e5936258.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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
            loader: '@byted/class-to-css-loader',
            options: {
              unit: 'px', // 使用的单位，默认 px，也可以设置成 rem
              tests: [
                /src\/.*$/, // 表示只转换 src 目录下的文件
              ],
            }
          }
        ],
      },
    ]
  },
}
```

### 解析对照表

| key | 代表css属性 | value | 例子 |
| - | - | - | - |
| d | display | `dn` => `display: none` | |
| fd | flex-direction |  | |
| ai | align-items |  | |
| jc | justify-content |  | |
| as | align-self |  | |
| m | margin |  | |
| mt | margin-top |  | |
| mb | margin-bottom |  | |
| ml | margin-left |  | |
| mr | margin-right |  | |
| p | padding |  | |
| pt | padding-top |  | |
| pb | padding-bottom |  | |
| pl | padding-left |  | |
| pr | padding-right |  | |
| f | float |  | |
| of | overflow |  | |
| of | overflow |  | |
| c | clear |  | |
| ofy | overflow-y |  | |
| ta | text-align |  | |
| td | text-decoration |  | |
| va | vertical-align |  | |
| bg | background |  | |
| bgc | background-color |  | |
| bgi | background-image |  | |
| bgs | background-size |  | |
| bgs | background-size |  | |
| lh | line-height |  | |
| fw | font-weight |  | |
| fs | font-size |  | |
| c | color |  | |
| td | text-decoration |  | |
| tof | text-overflow |  | |
| ws | white-space |  | |
| ls | letter-spacing |  | |
| ww | word-wrap |  | |
| wb | word-break |  | |
| p | position |  | |
| t | top |  | |
| b | bottom |  | |
| l | left |  | |
| r | right |  | |
| w | width |  | |
| miw | min-width |  | |
| maw | max-width |  | |
| h | height |  | |
| mih | min-height |  | |
| mah | max-height |  | |
| bw | border-width |  | |
| bbw | border-bottom-width |  | |
| blw | border-left-width |  | |
| brw | border-right-width |  | |
| btw | border-top-width |  | |
| bs | border-style |  | |
| bc | border-color |  | |
| br | border-radius |  | |
| btlr | border-top-left-radius |  | |
| btrr | border-top-right-radius |  | |
| bbrr | border-bottom-right-radius |  | |
| bblr | border-bottom-left-radius |  | |
| bs | box-sizing |  | |
| ol | outline |  | |
| t | transform |  | |
| o | opacity |  | |
| zi | z-index |  | |