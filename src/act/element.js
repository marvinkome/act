/**
 * creates element from jsx
 * @param {*} type
 * @param {*} config
 * @param {*} args
 */
export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(child => child != null && child !== false)
    .map(child => (child instanceof Object ? child : createTextElement(child)));

  return { type, props };
}

/**
 * create text element from jsx
 * @param {*} value
 */
export function createTextElement(value) {
  return createElement("TEXT_ELEMENT", { nodeValue: value });
}

/**
 * Create public instance of class components
 * @param {*} element
 * @param {*} internalInst
 */
export function createPublicInstance(element, internalInst) {
  const { type, props } = element;
  const publicInst = new type(props);
  publicInst.__internalInstance = internalInst;
  return publicInst;
}
