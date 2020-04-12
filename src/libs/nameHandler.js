const MERGE_REGS = {
  brReg: /^b(tl|tr|bl|br)?r((\d+)|(\.\d+)|(\d+\.\d+))$/, // border-radius
  bwReg: /^b[trbl]?w((\d+)|(\.\d+)|(\d+\.\d+))$/, // border-width
  mReg: /^m[trbl]?((\d+)|(\.\d+)|(\d+\.\d+))$/, // margin
  pReg: /^p[trbl]?((\d+)|(\.\d+)|(\d+\.\d+))$/, // padding
}

const parse = (names, rules, unit) => {
  const ctcInfos = []
  for (const name of names) {
    ctcInfos.push(getCtcInfo(name, rules, unit))
  }
  return ctcInfos
}

const getCtcInfo = (name, rules, unit) => {
  const key = getKey(name)
  const rule = rules.find(rule => rule.reg.test(key))
  if (!rule) return { name }

  return {
    type: 'common',
    key,
    unit,
    name: replaceSpecSymbol(name),
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

const getKey = name => {
  let result = rmImportant(name)
  result = rmPercent(result)
  result = rmAfter(result)
  result = rmBefore(result)
  return rmHover(result)
}

const hasImportant = name => /!/.test(name)
const rmImportant = name => name.replace(/!/g, '')

const hasPercent = name => /%/.test(name)
const rmPercent = name => name.replace(/%/g, '')

const hasAfter = name => /:a/.test(name)
const rmAfter = name => name.replace(/:a/, '')

const hasBefore = name => /:b/.test(name)
const rmBefore = name => name.replace(/:b/, '')

const hasHover = name => /:h/.test(name)
const rmHover = name => name.replace(/:h/, '')

const replaceSpecSymbol = (name) => {
  return name.replace(/\./g, '_dot_')
              .replace(/%/g, '_percent_')
              .replace(/!/g, '_important_')
              .replace(/:a/g, '_after_')
              .replace(/:b/g, '_before_')
              .replace(/:h/g, '_hover_')
}

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
  if (!reg.test(ctcInfo.key)) return false
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