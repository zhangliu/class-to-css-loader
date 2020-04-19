const backgroundImg = require('../ruleFuncs/backgroundImg')

const numberReg = /^-?((\d+)|(\.\d+)|(\d+\.\d+))$/;
const colorReg = /^(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/;

const genRules = (unit) => {
  return [
    // display
    { key: 'd', valReg: /b/, css: 'display:block' },
    { key: 'd', valReg: /ib/, css: 'display:inline-block' },
    { key: 'd', valReg: /n/, css: 'display:none' },
    { key: 'd', valReg: /f/, css: 'display:flex' },
    { key: 'd', valReg: /^if$/, css: 'display:inline-flex' },

    // flex
    { key: 'fd', valReg: /c/, css: 'flex-direction:column' },
    { key: 'ai', valReg: /^c$/, css: 'align-items:center' },
    { key: 'jc', valReg: /^c$/, css: 'justify-content:center' },
    { key: 'jc', valReg: /^sb$/, css: 'justify-content:space-between' },
    { key: 'jc', valReg: /^sa$/, css: 'justify-content:space-around' },
    { key: 'jc', valReg: /^fe$/, css: 'justify-content:flex-end' },
    { key: 'as', valReg: /^fe$/, css: 'align-self:flex-end' },

    // margin
    { key: 'm', valReg: numberReg, css: 'margin:$1' + unit },
    { key: 'mt', valReg: numberReg, css: 'margin-top:$1' + unit },
    { key: 'mb', valReg: numberReg, css: 'margin-bottom:$1' + unit },
    { key: 'ml', valReg: numberReg, css: 'margin-left:$1' + unit },
    { key: 'mr', valReg: numberReg, css: 'margin-right:$1' + unit },

    { key: 'mr', valReg: /^a$/, css: 'margin-right:auto' },
    { key: 'ml', valReg: /^a$/, css: 'margin-left:auto' },

    // padding
    { key: 'p', valReg: numberReg, css: 'padding:$1' + unit },
    { key: 'pt', valReg: numberReg, css: 'padding-top:$1' + unit },
    { key: 'pb', valReg: numberReg, css: 'padding-bottom:$1' + unit },
    { key: 'pl', valReg: numberReg, css: 'padding-left:$1' + unit },
    { key: 'pr', valReg: numberReg, css: 'padding-right:$1' + unit },

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
    { key: 'bgc', valReg: colorReg, css: 'background-color:#$1' },
    { key: 'bgi', valReg: /^lg-(\d+)-(\w{3,8})-(\w{3,8})$/, css: 'background-image:linear-gradient($1deg, #$2, #$3)'},
    { key: 'bgs', valReg: /^con$/, css: 'background-size: contain'},
    { key: 'bgs', valReg: /^cov$/, css: 'background-size: cover'},

    // font
    { key: 'lh', valReg: numberReg, css: 'line-height:$1' + unit },
    { key: 'lh', valReg: /^n$/, css: 'line-height:normal' },
    { key: 'fw', valReg: /^b$/, css: 'font-weight:bold' },
    { key: 'fs', valReg: numberReg, css: 'font-size:$1' + unit },
    { key: 'c', valReg: colorReg, css: 'color:#$1' },
    { key: 'td', valReg: /^n$/, css: 'text-decoration:none' },
    { key: 'td', valReg: /^u$/, css: 'text-decoration:underline' },
    { key: 'tof', valReg: /^e$/, css: 'text-overflow:ellipsis' },
    { key: 'ws', valReg: /^n$/, css: 'white-space:nowrap' },
    { key: 'ls', valReg: numberReg, css: 'letter-spacing: $1' + unit },
    { key: 'ww', valReg: /^bw$/, css: 'word-wrap:break-word' },
    { key: 'wb', valReg: /^ba$/, css: 'word-break:break-all' },

    // position
    { key: 'p', valReg: /^a$/, css: 'position:absolute' },
    { key: 'p', valReg: /^r$/, css: 'position:relative' },
    { key: 'p', valReg: /^f$/, css: 'position:fixed' },
    { key: 't', valReg: numberReg, css: 'top:$1' + unit },
    { key: 'b', valReg: numberReg, css: 'bottom:$1' + unit },
    { key: 'l', valReg: numberReg, css: 'left:$1' + unit },
    { key: 'r', valReg: numberReg, css: 'right:$1' + unit },

    //width and height
    { key: 'w', valReg: numberReg, css: 'width:$1' + unit },
    { key: 'miw', valReg: numberReg, css: 'min-width:$1' + unit },
    { key: 'maw', valReg: numberReg, css: 'max-width:$1' + unit },

    { key: 'h', valReg: numberReg, css: 'height:$1' + unit },
    { key: 'mih', valReg: numberReg, css: 'min-height:$1' + unit },
    { key: 'mah', valReg: numberReg, css: 'max-height:$1' + unit },

    // border
    { key: 'bw', valReg: numberReg, css: 'border-width:$1' + unit },
    { key: 'bbw', valReg: numberReg, css: 'border-bottom-width:$1' + unit },
    { key: 'blw', valReg: numberReg, css: 'border-left-width:$1' + unit },
    { key: 'brw', valReg: numberReg, css: 'border-right-width:$1' + unit },
    { key: 'btw', valReg: numberReg, css: 'border-top-width:$1' + unit },
    { key: 'bs', valReg: /^s$/, css: 'border-style:solid' },
    { key: 'bs', valReg: /^d$/, css: 'border-style:dashed' },
    { key: 'bc', valReg: colorReg, css: 'border-color:#$1' },
    { key: 'br', valReg: numberReg, css: 'border-radius:$1' + unit },
    { key: 'btlr', valReg: numberReg, css: 'border-top-left-radius:$1' + unit },
    { key: 'btrr', valReg: numberReg, css: 'border-top-right-radius:$1' + unit },
    { key: 'bbrr', valReg: numberReg, css: 'border-bottom-right-radius:$1' + unit },
    { key: 'bblr', valReg: numberReg, css: 'border-bottom-left-radius:$1' + unit },
    { key: 'bs', valReg: /^bb$/, css: 'box-sizing:border-box' },
    { key: 'ol', valReg: /^n$/, css: 'outline:none' },

    // transform
    { key: 't', valReg: /^r(\d+)$/, css: 'transform:rotate($1deg)' },

    // 透明
    { key: 'o', valReg: numberReg, css: 'opacity:$1' },
    { key: 'zi', valReg: /^\d+$/, css: 'z-index:$1' },
  ]
}

module.exports = {
  genRules,
}