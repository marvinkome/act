"use strict";

var TEXT_ELEMENT = "TEXT_ELEMENT";

function render(element, root) {
  var type = element.type,
      props = element.props; // check node type

  var isText = type === TEXT_ELEMENT;
  var dom = isText ? document.createTextNode("") : document.createElement(type);
  console.log({
    type: type,
    props: props
  }); // add listeners

  var isListener = function isListener(name) {
    return name.startsWith("on");
  };

  Object.keys(props).filter(isListener).forEach(function (name) {
    var eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, props[name]);
  }); // add attributes

  var isAttribute = function isAttribute(name) {
    return !isListener(name) && name !== "children";
  };

  Object.keys(props).filter(isAttribute).forEach(function (name) {
    dom[name] = props[name];
  });
  var children = props.children || [];
  children.forEach(function (childElement) {
    return render(childElement, dom);
  });
  root.appendChild(dom);
}

function createElement(type, config) {
  var _ref;

  var props = Object.assign({}, config);

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var hasChildren = args.length > 0;
  var rawChildren = hasChildren ? (_ref = []).concat.apply(_ref, args) : [];
  props.children = rawChildren.filter(function (child) {
    return child != null && child !== false;
  }).map(function (child) {
    return child instanceof Object ? child : createTextElement(child);
  });
  return {
    type: type,
    props: props
  };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, {
    nodeValue: value
  });
}

function importDidact() {
  return {
    createElement: createElement,
    createTextElement: createTextElement,
    render: render
  };
}