class Component {
  constructor($parent, props, initState = {}) {
    this.$parent = $parent;
    this.props = props;
    this.state = initState;

    this.initDOM();
    this.bindEvent();
    this.render();
  }

  initDOM() {}

  setState(state) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  bindEvent() {}

  render() {}
}

export default Component;
