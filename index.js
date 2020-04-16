const loaderUtils = require('loader-utils');
const reactConverter = require('./src/convers/reactConverter');
const vueConverter = require('./src/convers/vueConverter');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};
  const regs = options.tests || [/.*/];
  const isMatch = regs.find(reg => reg.test(this.resourcePath));
  if (!isMatch) return source;

  console.log(`\nwill gen css for file: ${this.resourcePath}`);
  const type = (options.type || 'vue').toLowerCase();
  const converter = type === 'vue' ? vueConverter : reactConverter;
  const result = converter.handle(source, options);
  return result;
}