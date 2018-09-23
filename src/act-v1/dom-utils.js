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
