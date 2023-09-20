const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');
const reactConverter = require('./src/convers/reactConverter');
const vueConverter = require('./src/convers/vueConverter');

const cache = {}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};
  const regs = options.tests || [/.*/];
  const isMatch = regs.find(reg => reg.test(this.resourcePath));
  if (!isMatch) return source;

  const mTime = fs.statSync(this.resourcePath).mtime;
  const cacheKey = `${this.resourcePath}@${mTime}`;
  if (cache[cacheKey]) return cache[cacheKey];

  // log(this.resourcePath);
  const extname = path.extname(this.resourcePath).toLowerCase();
  const type = getType(options.type, extname);
  const converter = type === 'vue' ? vueConverter : reactConverter;
  cache[cacheKey] = converter.handle(source, options, this.resourcePath);

  // console.log(cache[cacheKey], 'xxxxxxxxxxxxxxxxxxxxxxxx');

  return cache[cacheKey];
}

const log = (resourcePath) => {
  const file = path.basename(resourcePath);
  const dirname = path.basename(path.dirname(resourcePath));
  console.log(`will gen css for file: ${dirname}/${file}`);
}

const getType = (type, extname) => {
  if (type) return type.toLowerCase();

  if (['.vue'].includes(extname.toLowerCase())) return 'vue';
  if (/\.(js|ts)x$/i.test(extname)) return 'react';
  return 'vue';
}