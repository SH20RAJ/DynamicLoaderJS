# DynamicLoaderJS

DynamicLoaderJS is a lightweight JavaScript library that enables dynamic loading of content into web pages without page refresh. It provides a simple and flexible way to update specific sections of a website, such as the main content area, header, or footer, without reloading the entire page.

![DynamicLoaderJS Logo](https://cdn.jsdelivr.net/gh/SH20RAJ/DynamicLoaderJS@main/logo.svg)

[![GitHub license](https://img.shields.io/github/license/SH20RAJ/DynamicLoaderJS)](https://github.com/SH20RAJ/DynamicLoaderJS/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/SH20RAJ/DynamicLoaderJS)](https://github.com/SH20RAJ/DynamicLoaderJS/issues)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/DynamicLoaderJS)](https://github.com/SH20RAJ/DynamicLoaderJS/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SH20RAJ/DynamicLoaderJS)](https://github.com/SH20RAJ/DynamicLoaderJS/network)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features
- Dynamic loading of content into HTML elements
- Smooth animation effects during content transition
- Support for loading specific sections like header and footer
- URL update without page refresh
- Custom events for content load completion
- Ability to load CSS and JavaScript files dynamically
- Built-in loader element for visual feedback during content loading

## Installation
You can include DynamicLoaderJS in your project by downloading the [DynamicLoader.js](https://github.com/SH20RAJ/DynamicLoaderJS/blob/main/DynamicLoader.js) file and including it in your HTML file:

```html
<script src="path/to/DynamicLoader.js"></script>
```

Alternatively, you can use a CDN by including the following script tag in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/DynamicLoaderJS@main/DynamicLoader.js"></script>
```

## Usage
1. Add the `data-load` attribute to the HTML element where you want to load the content. Set the value of `data-load` to the URL of the content you want to load.

```html
<div data-load="page1.html" data-target="#content"></div>
```

- The `data-load` attribute specifies the URL of the content to be loaded.
- The `data-target` attribute specifies the selector of the target element where the content will be loaded.

2. Optionally, you can add the `data-loader` attribute to show a loader during content loading. Set `data-loader` to "true" to enable the loader.
3. Use `data-title` to change the document title after click.

```html
<div data-load="page1.html" data-target="#content" data-loader="true" data-title="Page1"></div>
```

4. You can also load specific sections like header and footer separately. Add the `data-load` attribute to the respective HTML element and specify the target selector using the `data-target` attribute.

```html
<header data-load="header.html" ></header>
<footer data-load="footer.html" ></footer>
```

5. To load CSS or JavaScript files dynamically, use the `loadFile` function with the URL of the file and the file type as parameters.

```javascript
DynamicLoader.loadFile('https://cdn.example.com/styles.css', 'css');
DynamicLoader.loadFile('https://cdn.example.com/script.js', 'js');
```

6. You can also load content into an element using JavaScript by calling `DynamicLoader.load()` and passing the selector, URL, and optional loader element.

```javascript
DynamicLoader.load('#op', 'page3.html');
```

This will load the content from `page3.html` into the element with the selector `#op`.

## Examples
For detailed usage examples, please refer to the [Examples](https://sh20raj.github.io/DynamicLoaderJS/) directory in this repository.

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

## License
This project is licensed under the [MIT License](https://github.com/SH20RAJ/DynamicLoaderJS/blob/main/LICENSE).

## Credits
Created with ❤️ by [SH20RAJ](https://github.com/sh20raj)
