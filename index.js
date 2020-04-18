const loaderUtils = require('loader-utils');
const path = require('path');
const reactConverter = require('./src/convers/reactConverter');
const vueConverter = require('./src/convers/vueConverter');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};
  const regs = options.tests || [/.*/];
  const isMatch = regs.find(reg => reg.test(this.resourcePath));
  if (!isMatch) return source;

  log(this.resourcePath);
  const extname = path.extname(this.resourcePath).toLowerCase();
  const type = getType(options.type, extname);
  const converter = type === 'vue' ? vueConverter : reactConverter;
  const result = converter.handle(source, options);
  // console.log(result, 'xxxxxxxxxxxxxxxxxxxxxxxx');
  return result;
}

const log = (resourcePath) => {
  const file = path.basename(resourcePath);
  const dirname = path.basename(path.dirname(resourcePath));
  console.log(`\nwill gen css for file: ${dirname}/${file}`);
}

const getType = (type, extname) => {
  if (type) return type.toLowerCase();

  if (['.vue'].includes(extname.toLowerCase())) return 'vue';
  if (['.jsx'].includes(extname.toLowerCase())) return 'react';
  return 'vue';
}