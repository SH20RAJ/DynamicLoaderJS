const DynamicLoader = {
  load: function (selector, url, loaderElement) {
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`Element with selector '${selector}' not found.`);
      return;
    }

    if (loaderElement) {
      loaderElement.style.display = 'block';
    }

    fetch(url)
      .then(response => response.text())
      .then(content => {
        // Apply animation effects during content transition
        element.classList.add('fade-in');

        setTimeout(() => {
          // Update the element's inner content
          element.innerHTML = content;

          // Remove animation class
          element.classList.remove('fade-in');

          // Trigger a custom event after content is loaded
          const event = new CustomEvent('contentLoaded', {
            detail: { url: url }
          });
          element.dispatchEvent(event);

          if (loaderElement) {
            loaderElement.style.display = 'none';
          }

          // Execute scripts in the loaded content
          this.executeScripts(element);

          // Load any nested content within the loaded content
          this.autoLoadNestedContent(element);

        }, 500); // Simulate delay for animation
      })
      .catch(error => {
        // Handle error and display an error message
        console.error(`Failed to load content from ${url}:`, error);
        element.innerHTML = '<div class="error-message">Failed to load content.</div>';

        if (loaderElement) {
          loaderElement.style.display = 'none';
        }
      });
  },

  autoLoad: function () {
    const elements = document.querySelectorAll('[data-load]');

    elements.forEach(element => {
      const url = element.dataset.load;
      const target = element.dataset.target;
      const loader = element.dataset.loader;

      if (target) {
        element.addEventListener('click', () => {
          const loaderElement = loader === 'true' ? createLoaderElement() : null;
          this.load(target, url, loaderElement);
        });
      } else {
        this.loadElementContent(element, url);
      }
    });

    const alertElements = document.querySelectorAll('[data-alert]');
    const urlElements = document.querySelectorAll('[data-url]');

    alertElements.forEach(element => {
      const alertMessage = element.dataset.alert;
      element.addEventListener('click', () => {
        alert(alertMessage);
      });
    });

    urlElements.forEach(element => {
      const url = window.origin + '/' + element.dataset.url;
      element.addEventListener('click', () => {
        window.history.pushState({}, "", url);
      });
    });
  },

  loadElementContent: function (element, url) {
    fetch(url)
      .then(response => response.text())
      .then(content => {
        element.innerHTML = content;

        // Execute scripts in the loaded content
        this.executeScripts(element);

        // Load any nested content within the loaded content
        this.autoLoadNestedContent(element);
      })
      .catch(error => {
        console.error(`Failed to load content from ${url}:`, error);
      });
  },

  executeScripts: function (element) {
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.text = script.innerText;
      script.parentNode.replaceChild(newScript, script);
    });
  },

  autoLoadNestedContent: function (parentElement) {
    const elements = parentElement.querySelectorAll('[data-load]');

    elements.forEach(element => {
      const url = element.dataset.load;
      const target = element.dataset.target;
      const loader = element.dataset.loader;

      if (target) {
        element.addEventListener('click', () => {
          const loaderElement = loader === 'true' ? createLoaderElement() : null;
          this.load(target, url, loaderElement);
        });
      } else {
        this.loadElementContent(element, url);
      }
    });
  },

  loadFile: function (url, fileType) {
    return new Promise((resolve, reject) => {
      let element;
      if (fileType === 'css') {
        element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = url;
      } else if (fileType === 'js') {
        element = document.createElement('script');
        element.src = url;
      } else {
        reject(new Error(`Unsupported file type: ${fileType}`));
      }

      element.onload = () => {
        resolve();
      };

      element.onerror = () => {
        reject(new Error(`Failed to load file: ${url}`));
      };

      document.head.appendChild(element);
    });
  }
};

function createLoaderElement() {
  const loaderElement = document.createElement('div');
  loaderElement.className = 'line-loader';
  document.body.appendChild(loaderElement);
  return loaderElement;
}

DynamicLoader.autoLoad();
