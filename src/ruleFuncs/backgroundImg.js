module.exports = (key, opts) => {
  const url = opts.imgUrl
  if (!url) return

  const match = key.match(/^bgi_([_0-9a-zA-Z]+)(\.[0-9a-zA-Z]+)?/)
  if (!match || !match[1]) return

  const img = match[1]
  const typeSuffix = match[2] || '.png'

  return `background-image: url('${url}/${img}${typeSuffix}')`
}