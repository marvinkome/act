class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateInstance(this.__internalInstance);
  }
}

function updateInstance(internalInstance) {
  const parent = internalInstance.dom.parentNode;
  const elem = internalInstance.element;
  reconcile(parent, internalInstance, elem);
}
