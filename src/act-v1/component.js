import { reconcile } from "./render";
import { scheduleUpdate } from "./fiber";

export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  oldSetState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateInstance(this.__internalInstance);
  }

  setState(partialState) {
    scheduleUpdate(this, partialState);
  }
}

export function createInstance(fiber) {
  const instance = new fiber.type(fiber.props);
  instance.__fiber = fiber;
  return instance;
}

export function updateInstance(internalInstance) {
  const parent = internalInstance.dom.parentNode;
  const elem = internalInstance.element;
  reconcile(parent, internalInstance, elem);
}
