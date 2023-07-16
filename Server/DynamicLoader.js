// DynamicLoader.js

var DynamicLoader = (function() {
  var components = {}; // Registered components
  var currentComponent = null; // Current rendered component
  var state = {}; // Application state
  var routes = {}; // Registered routes

  // Private function to render a component
  function renderComponent(componentName) {
    var component = components[componentName];
    if (!component) {
      console.error('Component not found:', componentName);
      return;
    }

    currentComponent = component;
    var contentContainer = document.getElementById(component.containerId);
    contentContainer.innerHTML = component.render();
  }

  // Public function to register a component
  function registerComponent(component) {
    components[component.name] = component;
  }

  // Public function to render a component by name
  function render(componentName) {
    renderComponent(componentName);
  }

  // Public function to set application state
  function setState(newState) {
    state = Object.assign({}, state, newState);
    renderComponent(currentComponent.name);
  }

  // Public function to register a route
  function registerRoute(route, componentName) {
    routes[route] = componentName;
  }

  // Public function to handle route changes
  function handleRouteChange() {
    var path = getCurrentPath();
    var componentName = routes[path];
    if (!componentName) {
      console.error('Route not found:', path);
      return;
    }
    renderComponent(componentName);
  }
  
  // Public function to get the current path from the URL
  function getCurrentPath() {
    return window.location.pathname;
  }
  
  // Public function to get the current hash from the URL
  function getCurrentHash() {
    return window.location.hash.slice(1);
  }
  
  // Public function to get the current URL
  function getCurrentURL() {
    return window.location.href;
  }

  // Public API
  return {
    registerComponent: registerComponent,
    render: render,
    setState: setState,
    registerRoute: registerRoute,
    handleRouteChange: handleRouteChange,
    getCurrentPath: getCurrentPath,
    getCurrentHash: getCurrentHash,
    getCurrentURL: getCurrentURL
  };
})();
