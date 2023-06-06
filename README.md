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

# class 完整规则
class 到 css 的转换方式是：[key]:[instance of valReg] => css

```js
[
  // display
  { key: 'd', valReg: /^b$/, css: 'display:block' },
  { key: 'd', valReg: /^ib$/, css: 'display:inline-block' },
  { key: 'd', valReg: /^n$/, css: 'display:none' },
  { key: 'd', valReg: /^f$/, css: 'display:flex' },
  { key: 'd', valReg: /^if$/, css: 'display:inline-flex' },

  // flex
  { key: 'f', valReg: /^n$/, css: 'flex:none' },
  { key: 'fd', valReg: /c/, css: 'flex-direction:column' },
  { key: 'fw', valReg: /^w$/, css: 'flex-wrap:wrap' },
  { key: 'ai', valReg: /^c$/, css: 'align-items:center' },
  { key: 'jc', valReg: /^c$/, css: 'justify-content:center' },
  { key: 'jc', valReg: /^sb$/, css: 'justify-content:space-between' },
  { key: 'jc', valReg: /^sa$/, css: 'justify-content:space-around' },
  { key: 'jc', valReg: /^fe$/, css: 'justify-content:flex-end' },
  { key: 'as', valReg: /^fe$/, css: 'align-self:flex-end' },

  // margin
  { key: 'm', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'margin:$1' + unit },
  { key: 'mt', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'margin-top:$1' + unit },
  { key: 'mb', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'margin-bottom:$1' + unit },
  { key: 'ml', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'margin-left:$1' + unit },
  { key: 'mr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'margin-right:$1' + unit },

  { key: 'mr', valReg: /^a$/, css: 'margin-right:auto' },
  { key: 'ml', valReg: /^a$/, css: 'margin-left:auto' },

  // padding
  { key: 'p', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'padding:$1' + unit },
  { key: 'pt', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'padding-top:$1' + unit },
  { key: 'pb', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'padding-bottom:$1' + unit },
  { key: 'pl', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'padding-left:$1' + unit },
  { key: 'pr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'padding-right:$1' + unit },

  { key: 'pr', valReg: /^a$/, css: 'padding-right:auto' },
  { key: 'pl', valReg: /^a$/, css: 'padding-left:auto' },

  // float
  { key: 'f', valReg: /^l$/, css: 'float:left' },
  { key: 'f', valReg: /^r$/, css: 'float:right' },
  { key: 'of', valReg: /^h$/, css: 'overflow:hidden' },
  { key: 'of', valReg: /^a$/, css: 'overflow:auto' },
  { key: 'c', valReg: /^b$/, css: 'clear:both' },
  { key: 'ofy', valReg: /^s$/, css: 'overflow-y: scroll' },

  // align
  { key: 'ta', valReg: /^l$/, css: 'text-align:left' },
  { key: 'ta', valReg: /^r$/, css: 'text-align:right' },
  { key: 'ta', valReg: /^c$/, css: 'text-align:center' },
  { key: 'td', valReg: /^lt$/, css: 'text-decoration:line-through' },
  { key: 'va', valReg: /^m$/, css: 'vertical-align:middle' },

  // background
  { key: 'bg', valReg: /^n$/, css: 'background:none' },
  { key: 'bgi', valReg: /^([_0-9a-zA-Z]+)(-([0-9a-zA-Z]+))?$/, css: backgroundImg },
  { key: 'bgc', valReg: /^(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/, css: 'background-color:#$1' },
  { key: 'bgi', valReg: /^lg-(\d+)-(\w{3,8})-(\w{3,8})$/, css: 'background-image:linear-gradient($1deg, #$2, #$3)'},
  { key: 'bgs', valReg: /^con$/, css: 'background-size: contain'},
  { key: 'bgs', valReg: /^cov$/, css: 'background-size: cover'},

  // font
  { key: 'lh', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'line-height:$1' + unit },
  { key: 'lh', valReg: /^n$/, css: 'line-height:normal' },
  { key: 'fw', valReg: /^b$/, css: 'font-weight:bold' },
  { key: 'fw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'font-weight:$1' },
  { key: 'fs', valReg: /^i$/, css: 'font-style:italic' },
  { key: 'fs', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'font-size:$1' + unit },
  { key: 'c', valReg: /^(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/, css: 'color:#$1' },
  { key: 'td', valReg: /^n$/, css: 'text-decoration:none' },
  { key: 'td', valReg: /^u$/, css: 'text-decoration:underline' },
  { key: 'tof', valReg: /^e$/, css: 'text-overflow:ellipsis' },
  { key: 'ws', valReg: /^n$/, css: 'white-space:nowrap' },
  { key: 'ls', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'letter-spacing: $1' + unit },
  { key: 'ww', valReg: /^bw$/, css: 'word-wrap:break-word' },
  { key: 'wb', valReg: /^ba$/, css: 'word-break:break-all' },

  // position
  { key: 'p', valReg: /^a$/, css: 'position:absolute' },
  { key: 'p', valReg: /^r$/, css: 'position:relative' },
  { key: 'p', valReg: /^f$/, css: 'position:fixed' },
  { key: 't', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'top:$1' + unit },
  { key: 'b', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'bottom:$1' + unit },
  { key: 'l', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'left:$1' + unit },
  { key: 'r', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'right:$1' + unit },

  //width and height
  { key: 'w', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'width:$1' + unit },
  { key: 'w', valReg: /^a$/, css: 'width: auto' },
  { key: 'miw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'min-width:$1' + unit },
  { key: 'maw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'max-width:$1' + unit },
  { key: 'maw', valReg: /^n$/, css: 'max-width: none' },

  { key: 'h', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'height:$1' + unit },
  { key: 'h', valReg: /^a$/, css: 'height: auto' },
  { key: 'mih', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'min-height:$1' + unit },
  { key: 'mah', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'max-height:$1' + unit },

  // border
  { key: 'bw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-width:$1' + unit },
  { key: 'bbw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-bottom-width:$1' + unit },
  { key: 'blw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-left-width:$1' + unit },
  { key: 'brw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-right-width:$1' + unit },
  { key: 'btw', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-top-width:$1' + unit },
  { key: 'bs', valReg: /^s$/, css: 'border-style:solid' },
  { key: 'bs', valReg: /^d$/, css: 'border-style:dashed' },
  { key: 'bc', valReg: /^(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/, css: 'border-color:#$1' },
  { key: 'br', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-radius:$1' + unit },
  { key: 'btlr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-top-left-radius:$1' + unit },
  { key: 'btrr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-top-right-radius:$1' + unit },
  { key: 'bbrr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-bottom-right-radius:$1' + unit },
  { key: 'bblr', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'border-bottom-left-radius:$1' + unit },
  { key: 'bs', valReg: /^bb$/, css: 'box-sizing:border-box' },
  { key: 'ol', valReg: /^n$/, css: 'outline:none' },
  { key: 'bs', valReg: /^n$/, css: 'box-shadow: none' },

  // transform
  { key: 't', valReg: /^r(\d+)$/, css: (key, value) => `transform: rotate(${value.substr(1)}deg)` },

  // 透明
  { key: 'o', valReg: /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/, css: 'opacity:$1' },
  { key: 'zi', valReg: /^\d+$/, css: 'z-index:$1' },

  // 鼠标
  { key: 'c', valReg: /^p$/, css: 'cursor: pointer' },
  { key: 'c', valReg: /^m$/, css: 'cursor: move' },

  // 其他
]
```