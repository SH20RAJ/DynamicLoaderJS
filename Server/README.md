
# DynamicLoader.js

DynamicLoader.js is a lightweight JavaScript library for creating dynamic web applications with client-side routing and component-based architecture.

## Features

- Component-based architecture
- Client-side routing
- State management
- Error handling
- Templating engine

## Getting Started

### Installation

You can include DynamicLoader.js in your project by downloading the [DynamicLoader.js](DynamicLoader.js) file and adding it to your project's directory.

### Usage

1. Include the DynamicLoader.js script in your HTML file:

```html
<script src="DynamicLoader.js"></script>
```

2. Register components using the `registerComponent` function:

```javascript
var HomeComponent = {
  name: 'Home',
  containerId: 'contentContainer',
  render: function() {
    return '<h2>Welcome to the Home page!</h2>';
  }
};

DynamicLoader.registerComponent(HomeComponent);
```

3. Register routes using the `registerRoute` function:

```javascript
DynamicLoader.registerRoute('/', 'Home');
```

4. Handle route changes:

```javascript
window.addEventListener('load', DynamicLoader.handleRouteChange);
window.addEventListener('popstate', DynamicLoader.handleRouteChange);
```

5. Customize and enhance the library as needed to meet your project requirements.

## API Reference

### `registerComponent(component)`

Register a component with the DynamicLoader.js library.

- `component`: An object representing the component with the following properties:
  - `name` (string): The name of the component.
  - `containerId` (string): The ID of the HTML element where the component should be rendered.
  - `render` (function): A function that returns the HTML content of the component.

### `registerRoute(route, componentName)`

Register a route with the DynamicLoader.js library.

- `route` (string): The route URL.
- `componentName` (string): The name of the component to render for the specified route.

### `handleRouteChange()`

Handle route changes triggered by the browser's `load` and `popstate` events.

### `getCurrentPath()`

Get the current path from the URL.

### `handleNotFound()`

Handle 404 errors when a route is not found. Renders the NotFoundComponent if registered; otherwise, logs an error.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or create an issue in the [GitHub repository](https://github.com/your-username/dynamic-loader-js).

## License

This project is licensed under the [MIT License](LICENSE).
