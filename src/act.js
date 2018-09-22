const TEXT_ELEMENT = "TEXT_ELEMENT";

function render(element, root) {
  const { type, props } = element;

  // check node type
  const isText = type === TEXT_ELEMENT;
  const dom = isText
    ? document.createTextNode("")
    : document.createElement(type);

  // add listeners
  const isListener = name => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // add attributes
  const isAttribute = name => !isListener(name) && name !== "children";
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });

  const children = props.children || [];
  children.forEach(childElement => render(childElement, dom));

  root.appendChild(dom);
}

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
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

function importAct() {
  return {
    createElement,
    createTextElement,
    render
  };
}
