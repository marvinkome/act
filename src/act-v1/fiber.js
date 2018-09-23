import { createInstance } from "./component";
import { updateDomProps } from "./dom-utils";

// effects tags
const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

// fiber tags
const HOST_COMPONENT = "host";
const CLASS_COMPONENT = "class";
const HOST_ROOT = "root";

const ENOUGH_TIME = 1; // in milliseconds

// global state
const updateQueue = [];
let nextUnitOfWork = null;
let pendingCommit = null;

// render
export function render(elements, containerDom) {
  updateQueue.push({
    from: HOST_ROOT,
    dom: containerDom,
    newProps: { children: elements }
  });

  requestIdleCallback(performWork);
}

export function scheduleUpdate(instance, partialState) {
  updateQueue.push({
    from: CLASS_COMPONENT,
    instance,
    partialState
  });

  requestIdleCallback(performWork);
}

export function performWork(deadline) {
  workLoop(deadline);

  // if there's still work todo
  if (nextUnitOfWork || updateQueue.length > 0) {
    requestIdleCallback(performWork);
  }
}

export function workLoop(deadline) {
  if (!nextUnitOfWork) {
    resetNextUnitOfWork();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}

export function performUnitOfWork(wipFiber) {
  beginWork(wipFiber);
  if (wipFiber.child) {
    return wipFiber;
  }

  let uow = wipFiber;
  while (uow) {
    completeWork(uow);
    if (uow.sibling) {
      return uow.sibling;
    }

    uow = uow.parent;
  }
}

export function beginWork(wipFiber) {
  if (wipFiber.tag === CLASS_COMPONENT) {
    updateClassComponent(wipFiber);
  } else {
    updateHostComponent(wipFiber);
  }
}

export function updateHostComponent(wipFiber) {
  if (!wipFiber.stateNode) {
    wipFiber.stateNode = createDomElement(wipFiber);
  }

  const newChildElements = wipFiber.props.children;
  reconcileChildrenArrays(wipFiber, newChildElements);
}

export function updateClassComponent(wipFiber) {
  let instance = wipFiber.stateNode;
  if (instance == null) {
    // create instance
    instance = wipFiber.stateNode = createInstance(wipFiber);
  } else if (wipFiber.props == instance.props && !wipFiber.partialState) {
    cloneChildren(wipFiber);
    return;
  }

  instance.props = wipFiber.props;
  instance.state = Object.assign({}, instance.state, wipFiber.partialState);
  wipFiber.partialState = null;

  const newChildElements = wipFiber.stateNode.render();
  reconcileChildrenArrays(wipFiber, newChildElements);
}

export function toArray(val) {
  return val == null ? [] : Array.isArray(val) ? val : [val];
}

export function reconcileChildrenArrays(fiber, children) {
  const elements = toArray(children);

  let index = 0;
  let oldFiber = fiber.alternate ? fiber.alternate.child : null;
  let newFiber = null;

  while (index < elements.length || oldFiber != null) {
    const prevFiber = newFiber;
    const element = index < elements.length && elements[index];
    const sameType = oldFiber && element && element.type == oldFiber.type;

    // new props or state
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        tag: oldFiber.tag,
        stateNode: oldFiber.stateNode,
        props: element.props,
        parent: fiber,
        alternate: oldFiber,
        partialState: oldFiber.partialState,
        effectTag: UPDATE
      };
    }

    // no element recreating
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        tag: typeof element === "string" ? HOST_COMPONENT : CLASS_COMPONENT,
        props: element.props,
        parent: fiber,
        effectTag: PLACEMENT
      };
    }

    // it's old so needs to be removed
    if (oldFiber && !sameType) {
      oldFiber.effectTag = DELETION;
      fiber.effects = fiber.effects || [];
      fiber.effects.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index == 0) {
      fiber.child = newFiber;
    } else if (prevFiber && element) {
      prevFiber.sibling = newFiber;
    }

    index++;
  }
}

export function cloneChildren(parentFiber) {
  const oldFiber = parentFiber.alternate;
  if (!oldFiber.child) {
    return;
  }

  let oldChild = oldFiber.child;
  let prevChild = null;

  while (oldChild) {
    const newChild = {
      type: oldChild.type,
      tag: oldChild.tag,
      stateNode: oldChild.stateNode,
      props: oldChild.props,
      partialState: oldChild.partialState,
      alternate: oldChild,
      parent: parentFiber
    };

    if (prevChild) {
      prevChild.sibling = newChild;
    } else {
      parentFiber.child = newChild;
    }

    prevChild = newChild;
    oldChild = oldChild.sibling;
  }
}

export function completeWork(fiber) {
  if (fiber.tag == CLASS_COMPONENT) {
    fiber.stateNode.__fiber = fiber;
  }

  if (fiber.parent) {
    const childEffects = fiber.effects || [];
    const thisEffect = fiber.effectTag != null ? [fiber] : [];
    const parentEffects = fiber.parent.effects || [];

    fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
  } else {
    pendingCommit = fiber;
  }
}

export function commitAllWork(fiber) {
  fiber.effects.forEach(f => commitWork(f));
  fiber.stateNode._rootContainerFiber = fiber;
  nextUnitOfWork = null;
  pendingCommit = null;
}

export function commitWork(fiber) {
  if (fiber.tag == HOST_ROOT) return;

  let domParentFiber = fiber.parent;
  while (domParentFiber.tag == CLASS_COMPONENT) {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.stateNode;

  if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
    domParent.appendChild(fiber.stateNode);
  } else if (fiber.effectTag == UPDATE) {
    updateDomProps(fiber.stateNode, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag == DELETION) {
    commitDeletion(fiber, domParent);
  }
}

export function commitDeletion(fiber, domParent) {
  let node = fiber;
  while (true) {
    if (node.tag == CLASS_COMPONENT) {
      node = node.child;
      continue;
    }

    domParent.removeChild(node.stateNode);

    while (node != fiber && !node.sibling) {
      node = node.parent;
    }

    if (node == fiber) {
      return;
    }

    node = node.sibling;
  }
}
