### class-to-css-loader
这个 loader 可以根据你代码里的 class，自动生成相应的 css。

### 功能简介
假设你有如下vue文件代码：
```vue
// xxx.vue
<template>
  <div class="m10 p10 fs12">你好世界</div>
</template>
```

经过该 loader 转换后，在浏览器实际运行的代码是：

```html
<div class="m10 p10 fs12">你好世界</div>
<style>
.m10 { margin: 10px; }
.p10 { padding: 10px; }
.fs12 { font-size: 12px; }
</style>
```
可以看到，该babel会自动解析你的class，然后生成相应的css。

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

### 语法说明
#### class="key[separator]value"
* **key:** 表示 css属性 首字母的简写，比如 key: `ml`，代表 css 的 `margin-left`属性。

* **separator:** 可选项，表示 key 和 value 之间的分隔符，如果设置了某个字符，比如冒号：`:`，则 `ml:10` 才会被解析为：`margin-left: 10px`

* **value:** 表示你需要设置的属性值，例如，你想设置字体大小为`12px`，者可以写为：`fs:12`，更多请参见下面的对照表。

### 解析对照表（以冒号为分隔符为例）

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