const getRaws = (node) => {
  if (!node) return [];
  if (node.type !== 'TemplateLiteral') return [];

  const quasis = node.quasis || [];
  const raws = quasis.filter(q => q.type === 'TemplateElement').map(q => q.value.raw);
  return raws;
}

const setQuasis = (node, raw) => {
  if (!node) return;
  if (node.type !== 'TemplateLiteral') return;

  const tElements = node.quasis.filter(q => q.type === 'TemplateElement');
  if (!tElements.length) return;

  const rawWithSpace = `${raw} `;
  tElements.forEach(te => te.value = { raw: ' ', cooked: ' ' });
  tElements[0].value = { raw: rawWithSpace, cooked: rawWithSpace };
}

module.exports = {
  getRaws,
  setQuasis
}