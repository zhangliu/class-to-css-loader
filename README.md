### class-to-css-loader
这个 loader 可以根据你代码里的 class，自动生成相应的 css。

### 功能简介
假设你有如下vue文件代码：
```
// xxx.vue
<template>
  <div class="m10 p10 fs12">你好世界</div>
</template>
```

经过该 loader 转换后，在浏览器实际运行的代码是：

```
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

#### 语法说明
【待补充】