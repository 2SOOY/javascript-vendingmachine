class Router {
  constructor(routeTable) {
    this.routeTable = routeTable;
    this.bindEvent();
  }

  bindEvent() {
    window.addEventListener("popstate", (e) => {
      const path = e.target.location.pathname.split("/")[1];
      const target = path.toUpperCase();
      const { component } = this.routeTable[target];
      component?.init();
    });
  }

  routeTo(target) {
    const { path, component } = this.routeTable[target];

    history.pushState(null, null, path);
    component?.init();
  }
}

export default Router;
