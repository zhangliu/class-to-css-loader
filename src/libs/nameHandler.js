const { getKeyReg } = require('./rules');

const MERGE_REGS = {
  brReg: /^b(tl|tr|bl|br)?r((\d+)|(\.\d+)|(\d+\.\d+))$/, // border-radius
  bwReg: /^b[trbl]?w((\d+)|(\.\d+)|(\d+\.\d+))$/, // border-width
  mReg: /^m[trbl]?((\d+)|(\.\d+)|(\d+\.\d+))$/, // margin
  pReg: /^p[trbl]?((\d+)|(\.\d+)|(\d+\.\d+))$/, // padding
}

// const specSymbols = {
//   '.': '_dot_',
//   '%': '_percent_',
//   '!': '_important_',
//   '#a': '_after_',
//   '#b': '_before_',
//   '#h': '_hover_',
// }

const parse = (names, rules, opts) => {
  const ctcInfos = [];
  for (const name of names) {
    ctcInfos.push(getCtcInfo(name, rules, opts))
  }
  return ctcInfos
}

const getCtcInfo = (name, rules, opts) => {
  const unit = opts.unit || 'px';
  const separator = opts.separator;
  const { key, value } = getKeyValue(name, separator);
  const rule = getRule(key, value, separator, rules);
  if (!rule) return { name }

  return {
    type: 'common',
    key,
    value,
    unit,
    name: replaceSpecSymbol(name, separator),
    rule,
    option: {
      hasImportant: hasImportant(name),
      hasPercent: hasPercent(name),
      pseudo: {
        hasAfter: hasAfter(name),
        hasBefore: hasBefore(name),
        hasHover: hasHover(name)
      }
    }
  }
}

const getKeyValue = (name, separator) => {
  let result = rmImportant(name);
  result = rmPercent(result);
  result = rmAfter(result);
  result = rmBefore(result);
  result = rmHover(result);

  if (!separator) return { key: result };

  const tempArr = result.split(separator);
  return { key: tempArr[0], value: tempArr[1] };
}

const getRule = (key, value, separator, rules) => {
  if (separator && !value) return;

  for (const rule of rules) {
    if (value) {
      if (rule.key === key && rule.valReg.test(value)) return rule;
      continue;
    }

    const reg = getKeyReg(rule);
    if (reg.test(key)) return rule;
  }
}

const hasImportant = name => /!/.test(name)
const rmImportant = name => name.replace(/!/g, '')

const hasPercent = name => /%/.test(name)
const rmPercent = name => name.replace(/%/g, '')

const hasAfter = name => /#a/.test(name)
const rmAfter = name => name.replace(/#a/, '')

const hasBefore = name => /#b/.test(name)
const rmBefore = name => name.replace(/#b/, '')

const hasHover = name => /#h/.test(name)
const rmHover = name => name.replace(/#h/, '')

const replaceSpecSymbol = (name, separator) => {
  return name.replace(/\./g, '_dot_')
    .replace(/%/g, '_percent_')
    .replace(/!/g, '_important_')
    .replace(/#a/g, '_after_')
    .replace(/#b/g, '_before_')
    .replace(/#h/g, '_hover_')
    .replace(separator, '_s_');
}

// merge 是为了防止在某个div设置了： m0 mt10，但是之后的一个div也这是了：m0，后面的 m0 会覆盖前面的 mt10.
const merge = (ctcInfos) => {
  let result = ctcInfos
  const regs = Object.values(MERGE_REGS)
  for (const reg of regs) {
    const tmpInfos = ctcInfos.filter(ctcInfo => canMerged(ctcInfo, reg))
    if (tmpInfos.length <= 1) continue

    const mergedCtcInfo = mergeToOne(tmpInfos)
    
    // 剔除掉已合并的，添加上合并后的
    result = result.filter(info => !tmpInfos.includes(info))
    result.push(mergedCtcInfo)
  }
  return result
}

const canMerged = (ctcInfo, reg) => {
  const content = ctcInfo.key + (ctcInfo.value || '');
  if (!reg.test(content)) return false
  const hasPseudo = Object.values(ctcInfo.option.pseudo).find(value => !!value)
  return !hasPseudo
}

const mergeToOne = ctcInfos => {
  return {
    type: 'merged',
    name: 'ctc_' + ctcInfos.map(ctcInfo => ctcInfo.name).join('_'),
    ctcInfos
  }
}

module.exports = {
  parse,
  merge
}