const backgroundImg = require('../ruleFuncs/backgroundImg')

const genRules = (unit) => {
  return [
    // display
    { reg: /^db$/, to: 'display:block' },
    { reg: /^dib$/, to: 'display:inline-block' },
    { reg: /^dn$/, to: 'display:none' },
    { reg: /^df$/, to: 'display:flex' },

    // flex
    { reg: /^fdc$/, to: 'flex-direction:column' },
    { reg: /^aic$/, to: 'align-items:center' },
    { reg: /^jcc$/, to: 'justify-content:center' },
    { reg: /^dif$/, to: 'display:inline-flex' },
    { reg: /^jcsb$/, to: 'justify-content:space-between' },
    { reg: /^jcsa$/, to: 'justify-content:space-around' },
    { reg: /^jcfe$/, to: 'justify-content:flex-end' },
    { reg: /^asfe$/, to: 'align-self:flex-end' },

    // margin
    { reg: /^m(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'margin:$1' + unit },
    { reg: /^mt(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'margin-top:$1' + unit },
    { reg: /^mb(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'margin-bottom:$1' + unit },
    { reg: /^ml(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'margin-left:$1' + unit },
    { reg: /^mr(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'margin-right:$1' + unit },

    { reg: /^mra$/, to: 'margin-right:auto' },
    { reg: /^mla$/, to: 'margin-left:auto' },

    // padding
    { reg: /^p(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'padding:$1' + unit },
    { reg: /^pt(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'padding-top:$1' + unit },
    { reg: /^pb(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'padding-bottom:$1' + unit },
    { reg: /^pl(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'padding-left:$1' + unit },
    { reg: /^pr(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'padding-right:$1' + unit },

    { reg: /^pra$/, to: 'padding-right:auto' },
    { reg: /^pla$/, to: 'padding-left:auto' },

    // float
    { reg: /^fl$/, to: 'float:left' },
    { reg: /^fr$/, to: 'float:right' },
    { reg: /^ofh$/, to: 'overflow:hidden' },
    { reg: /^ofa$/, to: 'overflow:auto' },
    { reg: /^cb$/, to: 'clear:both' },
    { reg: /^ofys$/, to: 'overflow-y: scroll' },

    // align
    { reg: /^tal$/, to: 'text-align:left' },
    { reg: /^tar$/, to: 'text-align:right' },
    { reg: /^tac$/, to: 'text-align:center' },
    { reg: /^tdlt$/, to: 'text-decoration:line-through' },
    { reg: /^vam$/, to: 'vertical-align:middle' },

    // background
    { reg: /^bgn$/, to: 'background:none' },
    { reg: /^bgi-([_0-9a-zA-Z]+)(-([0-9a-zA-Z]+))?$/, to: backgroundImg },
    { reg: /^bgc([0-9a-fA-F]{3,8})$/, to: 'background-color:#$1' },
    { reg: /^bilg-(\d+)-(\w{3,8})-(\w{3,8})$/, to: 'background-image:linear-gradient($1deg, #$2, #$3)'},

    // font
    { reg: /^lh(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'line-height:$1' + unit },
    { reg: /^fwb$/, to: 'font-weight:bold' },
    { reg: /^fs(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'font-size:$1' + unit },
    { reg: /^c([0-9a-fA-F]{3,8})$/, to: 'color:#$1' },
    { reg: /^tdn$/, to: 'text-decoration:none' },
    { reg: /^tdu$/, to: 'text-decoration:underline' },
    { reg: /^toe$/, to: 'text-overflow:ellipsis' },
    { reg: /^wsn$/, to: 'white-space:nowrap' },
    { reg: /^ls(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'letter-spacing: $1' + unit },
    { reg: /^wwbw$/, to: 'word-wrap:break-word' },
    { reg: /^wbba$/, to: 'word-break:break-all' },

    // position
    { reg: /^pa$/, to: 'position:absolute' },
    { reg: /^pr$/, to: 'position:relative' },
    { reg: /^pf$/, to: 'position:fixed' },
    { reg: /^t(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'top:$1' + unit },
    { reg: /^b(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'bottom:$1' + unit },
    { reg: /^l(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'left:$1' + unit },
    { reg: /^r(-?((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'right:$1' + unit },

    //width and height
    { reg: /^w(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'width:$1' + unit },
    { reg: /^miw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'min-width:$1' + unit },
    { reg: /^maw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'max-width:$1' + unit },

    { reg: /^h(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'height:$1' + unit },
    { reg: /^mih(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'min-height:$1' + unit },
    { reg: /^mah(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'max-height:$1' + unit },

    // border
    { reg: /^bw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-width:$1' + unit },
    { reg: /^bbw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-bottom-width:$1' + unit },
    { reg: /^blw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-left-width:$1' + unit },
    { reg: /^brw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-right-width:$1' + unit },
    { reg: /^btw(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-top-width:$1' + unit },
    { reg: /^bss$/, to: 'border-style:solid' },
    { reg: /^bsd$/, to: 'border-style:dashed' },
    { reg: /^bc(\w{3,8})$/, to: 'border-color:#$1' },
    { reg: /^br(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-radius:$1' + unit },
    { reg: /^btlr(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-top-left-radius:$1' + unit },
    { reg: /^btrr(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-top-right-radius:$1' + unit },
    { reg: /^bbrr(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-bottom-right-radius:$1' + unit },
    { reg: /^bblr(((\d+)|(\.\d+)|(\d+\.\d+)))$/, to: 'border-bottom-left-radius:$1' + unit },
    { reg: /^bsbb$/, to: 'box-sizing:border-box' },
    { reg: /^on$/, to: 'outline:none' },

    // transform
    { reg: /^tr(\d+)$/, to: 'transform:rotate($1deg)' },

    // 背景
    { reg: /^bgsct$/, to: 'background-size: contain'},
    { reg: /^bgscv$/, to: 'background-size: cover'},

    // 透明
    { reg: /^o(\d+)$/, to: 'opacity:.$1' },
    { reg: /^zi(-?\d+)$/, to: 'z-index:$1' },
  ]
}

module.exports = {
  genRules
}