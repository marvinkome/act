// jsx implementation
function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(child => child != null && child !== false)
    .map(child => (child instanceof Object ? child : createTextElement(child)));

  return { type, props };
}

function createTextElement(value) {
  return createElement("TEXT_ELEMENT", { nodeValue: value });
}

function createPublicInstance(element, internalInst) {
  const { type, props } = element;
  const publicInst = new type(props);
  publicInst.__internalInstance = internalInst;
  return publicInst;
}
