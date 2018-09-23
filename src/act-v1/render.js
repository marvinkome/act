import { createPublicInstance } from "./jsx";

let rootInstance = null;

export function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

// reconciling
export function reconcile(parent, instance, element) {
  if (instance == null) {
    // check if it's a new node instance
    // add the new item to dom
    const newInstance = instanciate(element);
    parent.appendChild(newInstance.dom);

    // return the instance
    return newInstance;
  } else if (element == null) {
    // if not element to update, then we assume it should be removed
    // remove element from dom
    parent.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    // recreate the element with new props and replace it in the dom
    const newInstance = instanciate(element);
    parent.replaceChild(newInstance.dom, instance.dom);

    // return recreated element
    return newInstance;
  } else if (typeof element.type === "string") {
    // if it's same node we should reuse it
    // update dom props
    updateDomProps(instance.dom, instance.element.props, element.props);

    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    // update component props
    instance.publicInstance.props = element.props;
    const childElem = instance.publicInstance.render();
    const oldChildInst = instance.childInstance;

    const childInstance = reconcile(parent, oldChildInst, childElem);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;

    return instance;
  }
}

export function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];

  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInst = childInstances[i];
    const childElem = nextChildElements[i];
    const newChildInst = reconcile(dom, childInst, childElem);
    newChildInstances.push(newChildInst);
  }

  return newChildInstances.filter(inst => inst != null);
}

// initiate a component
export function instanciate(element) {
  const { type, props } = element;
  const isDomElem = typeof type === "string";

  if (isDomElem) {
    // check node type
    const isText = type === "TEXT_ELEMENT";
    const dom = isText
      ? document.createTextNode("")
      : document.createElement(type);

    // update props
    updateDomProps(dom, [], props);

    // instanciate and append children
    const children = props.children || [];
    const childInstances = children.map(instanciate);
    const childDoms = childInstances.map(child => child.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    // create element instance
    const instance = {
      dom,
      element,
      childInstances
    };

    return instance;
  } else {
    // initiate component
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElem = publicInstance.render();
    const childInstance = instanciate(childElem);
    const dom = childInstance.dom;

    Object.assign(instance, {
      dom,
      element,
      childInstance,
      publicInstance
    });

    return instance;
  }
}

// updating
export function updateDomProps(dom, prevProps, newProps) {
  const isEvent = name => name.startsWith("on");
  const isAttribute = name => !isEvent(name) && name !== "children";

  // remove events
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = null;
    });

  // set new attributes
  Object.keys(newProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = newProps[name];
    });

  // set new event listeners
  Object.keys(newProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, newProps[name]);
    });
}
