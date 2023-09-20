const fs = require('fs');
const { EOL } = require('os');
const parser = require('@babel/parser');
const { basename, dirname } = require('path');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const { genRules } = require('../libs/rules');
const nameHandler = require('../libs/nameHandler');
const cssHandler = require('../libs/cssHandler');
const { getRaws, setQuasis } = require('../libs/tLiteral');

module.exports.handle = (source, opts, file) => {
  const ast = parser.parse(source, { allowImportExportEverywhere: true, plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy'] });
  let allCsses = [];
  traverse(ast, {
    JSXAttribute(path) {
      try {
        let names = getNames(path.node) || [];
        if (names.length <= 0) return;

        const res = handleNames(names, opts);
        setClass(path.node, res.names);
        allCsses = allCsses.concat(res.csses || []);
      } catch(e) {
        console.error(e)
      }
    }
  });

  allCsses = [...new Set(allCsses)];
  const cssFile = genCssFile(allCsses, file);
  const newSource = generate(ast);

  if (opts.import === false) return newSource.code;
  if (!cssFile) return newSource.code;
  return `import './${cssFile}';${newSource.code}`;
};

const getNames = (node) => {
  if (!node.name) return []
  if (node.name.name !== 'className') return [];
  if (!node.value) return;

  const isStringLiteral = node.value.type === 'StringLiteral';
  let names = null;
  if (isStringLiteral) names = node.value.value.split(' ').filter(s => s.length);
  else {
    const raws = getRaws(node.value.expression);
    names = raws.join(' ').split(' ').filter(s => s.length);
  }

  return names.filter(name => !!name.trim());
}

const handleNames = (names, opts = {}) => {
  const csses = [];
  const defaultRules = genRules(cssHandler.UNIT_HOLDER)
  const rules = (opts.rules || []).concat(defaultRules);

  const newNames = []
  let ctcInfos = nameHandler.parse(names, rules, opts);
  ctcInfos = nameHandler.merge(ctcInfos)

  for (const ctcInfo of ctcInfos) {
    newNames.push(ctcInfo.name);
    const css = cssHandler.genCss(ctcInfo);
    if (css) csses.push(css)
  }
  return { names: newNames, csses };
}

const setClass = (node, names) => {
  const uniqNames = [...(new Set(names || []))];
  if (node.value.type === 'StringLiteral') {
    node.value.value = uniqNames.join(' ');
    return;
  }

  setQuasis(node.value.expression, uniqNames.join(' '));
}

const genCssFile = (csses, file) => {
  if (csses.length <= 0) return;
  const index = basename(file).indexOf('.');
  const cssFile = `${basename(file).substr(0, index)}.ctc.css`;
  const absoluteCssFile = `${dirname(file)}/${cssFile}`;

  const content = `/* 自动生成的文件，请不要修改 */${EOL}${csses.join(EOL)}`
  fs.writeFileSync(absoluteCssFile, content);
  return cssFile;
}