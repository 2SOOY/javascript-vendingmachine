class Router {
  constructor(routeTable) {
    this.routeTable = routeTable;
  }

  routeTo(target) {
    const { path, component } = this.routeTable[target];

    // history.pushState(null, null, path);
    component?.init();
  }
}

export default Router;
