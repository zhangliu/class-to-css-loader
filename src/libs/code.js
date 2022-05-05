const getEleCode = ele => {
  if (ele) {
    const params = getParams(ele.attrs)
    const content = (ele.content || '').replace(/^\s*$/g, '').replace(/\/\/\n/g, '')
    if (params.length) {
      return `<${ele.type} ${params.join(' ')}>${content}</${ele.type}>`
    }
    return `<${ele.type}>${content}</${ele.type}>`
  }
  return ''
}

const getParams = attrs => {
  return Object.keys(attrs).map(key => {
    const value = attrs[key]
    if (typeof value === 'string') return `${key}="${value}"`
    // 如果是boolean，只可能是true值
    if (typeof value === 'boolean') return `${key}`

    const message = `未知的属性: ${key}`
    console.error(message)
    throw new Error(message)
  })
}

module.exports = {
  getEleCode
}
