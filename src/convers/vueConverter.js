const cheerio = require('cheerio');
const compiler = require('vue-template-compiler');
const { getEleCode } = require('../libs/code');
const nameHandler = require('../libs/nameHandler');
const cssHandler = require('../libs/cssHandler');
const { genRules } = require('../libs/rules');

const EMPTY_ATTR = '__EMPTY_ATTR__';
const emptyAttrReg = new RegExp(`="${EMPTY_ATTR}"`, 'g');
let rules;

module.exports.handle = (source, opts) => {
  const res = compiler.parseComponent(source, {pad: 'line'});
  const html = (res.template || {}).content;
  const handleRes = handleHtml(html, opts || {});
  if (!handleRes) return source;

  res.template = res.template ? { ...res.template, content: handleRes.html } : undefined;
  const style = {
    type: 'style',
    content: [...(new Set(handleRes.csses))].join(''),
    attrs: { lang: 'css', scoped: true },
  };
  res.styles = Array.isArray(res.styles) ? res.styles.concat(style) : [style];

  return `
    ${getEleCode(res.template)}
    ${getEleCode(res.script)}
    ${res.styles.map(getEleCode).join('\n')}
  `
};

const handleHtml = (html, opts) => {
  if (!html) return;

  const $ = cheerio.load(html, {xml: { normalizeWhitespace: false, decodeEntities: false }});
  const tagNodes = ($.root()[0].children || []).filter(child => child.type === 'tag');
  if (!tagNodes.length) return;

  let csses = [];
  tagNodes.forEach(node => csses = csses.concat(handleNode(node, opts)));

  const newHtml = $.root().html().replace(emptyAttrReg, '');

  return { html: newHtml, csses };
}

const handleNode = (node, opts) => {
  let csses = [];
  csses = csses.concat(handleAttrs(node, opts));

  (node.children || []).forEach(child => {
    // csses = csses.concat(handleAttrs(child, opts));
    if (child.type !== 'tag') return;
    csses = csses.concat(handleNode(child, opts));
  })

  return csses;
}

const handleAttrs = (node, opts) => {
  let csses = [];
  const attrs = node.attribs;
  if (!attrs) return csses;

  Object.keys(attrs).forEach(key => {
    if (attrs[key] === "") {
      attrs[key] = EMPTY_ATTR;
      return;
    }
    if (key.toLowerCase() !== 'class') return;

    const classname = attrs[key] || '';
    const names = classname.split(' ').filter(s => s.length);
    if (names.length <= 0) return;

    const res = handleNames(names, opts);
    attrs[key] = res.names.join(' ');
    csses = csses.concat(res.csses);
  })

  return csses;
}

const handleNames = (names, opts = {}) => {
  const csses = [];
  const defaultRules = genRules(cssHandler.UNIT_HOLDER)
  const rules = (opts.rules || []).concat(defaultRules);

  const newNames = []
  let ctcInfos = nameHandler.parse(names, rules, opts);
  ctcInfos = nameHandler.merge(ctcInfos)

  for (const ctcInfo of ctcInfos) {
    newNames.push(ctcInfo.name)
    csses.push(cssHandler.genCss(ctcInfo))
  }
  return { names: newNames, csses };
}