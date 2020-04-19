const UNIT_HOLDER = '_unit_';

const genCss = (ctcInfo) => {
  if (ctcInfo.type === 'common') {
    const cssValue = genCssValueFromCtcInfo(ctcInfo);

    const { name, option: { pseudo } } = ctcInfo;
    const cssKey = addPseudo(name, pseudo);

    return `.${cssKey}{${cssValue}}`;
  }
  if (ctcInfo.type === 'merged') {
    const { name, ctcInfos } = ctcInfo
    const cssValue = ctcInfos.map(genCssValueFromCtcInfo).join(';')
    return `.${name}{${cssValue}}`
  }
  return ''
}

const genCssValueFromCtcInfo = ctcInfo => {
  const { key, value, rule, option: { hasImportant, hasPercent } } = ctcInfo

  let cssValue = getCssValue(key, value, rule);
  cssValue = handleImportant(cssValue, hasImportant)
  cssValue = handleUnit(cssValue, ctcInfo.unit, { hasPercent })

  return cssValue
}

const getCssValue = (key, value, rule) => {
  if (isFunc(rule.css)) return rule.css(key, value);
  return value.replace(/^(.*?)$/g, rule.css);
}

const handleImportant = (cssValue, hasImportant) => {
  if (!hasImportant) return cssValue
  return `${cssValue.replace(';', '')} !important`
}

const handleUnit = (cssValue, unit, {hasPercent}) => {
  const reg = new RegExp(UNIT_HOLDER, 'g')

  if (!hasPercent) return cssValue.replace(reg, unit)
  return cssValue.replace(reg, '%')
}

const addPseudo = (cssKey, pseudo) => {
  if (pseudo.hasAfter) return `${cssKey}:after`
  if (pseudo.hasBefore) return `${cssKey}:before`
  if (pseudo.hasHover) return `${cssKey}:hover`
  return cssKey
}

const isFunc = func => typeof func === 'function'

module.exports = {
  genCss,
  UNIT_HOLDER,
}