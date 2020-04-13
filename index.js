const loaderUtils = require('loader-utils');
const reactConverter = require('./src/convers/reactConverter');
const vueConverter = require('./src/convers/vueConverter');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};
  const reg = options.test || /.*/;  
  if (!reg.test(this.resourcePath)) return source;

  console.log(`will gen css for file: ${this.resourcePath}`)
  const type = (options.type || 'vue').toLowerCase();
  const converter = type === 'vue' ? vueConverter : reactConverter;
  const result = converter.handle(source, options);
  return result;
}