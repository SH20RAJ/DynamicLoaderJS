# Dynamic Content Loader

The Dynamic Content Loader is a JavaScript script that allows you to dynamically load content into elements on your webpage without having to reload the entire page.

## Usage

1. Include the `DynamicLoader.js` script in your HTML file:

```html
<script src="DynamicLoader.js"></script>
```

2. To load content into an element, use the `data-load` attribute. Add this attribute to any element you want to load content into, and set its value to the URL of the content to be loaded:

```html
<div data-load="page1.html"></div>
```

3. If you want to load content into a specific target element when another element is clicked, use the `data-target` attribute along with the `data-load` attribute. Set the value of `data-target` to the CSS selector of the target element:

```html
<button data-load="header.html" data-target="#header">Load Header</button>
<button data-load="footer.html" data-target="#footer">Load Footer</button>
```

4. To automatically load content into elements with the `data-load` attribute, call the `DynamicLoader.autoLoad()` function:

```html
<script>
  DynamicLoader.autoLoad();
</script>
```

5. If you want to load content into an element using a custom selector, you can manually call the `DynamicLoader.load(selector, url)` function:

```html
<script>
  DynamicLoader.load('#myCustomElement', 'page2.html');
</script>
```

6. Enjoy the ability to load sections separately, such as header and footer, without reloading the entire page. This allows you to dynamically change the content of your website while maintaining a smooth user experience.

Make sure to replace `'page1.html'`, `'header.html'`, `'footer.html'`, `'#header'`, `'#footer'`, and `'#myCustomElement'` with the actual URLs and CSS selectors for your content and target elements.

That's it! With the Dynamic Content Loader, you can easily load content into elements on your webpage, including separate sections like headers and footers, without having to reload the entire page.

