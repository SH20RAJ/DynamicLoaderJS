// DynamicLoader.js

const DynamicLoader = {
  load: function(selector, url) {
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`Element with selector '${selector}' not found.`);
      return;
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
        }, 500); // Simulate delay for animation
      })
      .catch(error => {
        // Handle error and display an error message
        console.error(`Failed to load content from ${url}:`, error);
        element.innerHTML = '<div class="error-message">Failed to load content.</div>';
      });
  },

  autoLoad: function() {
    const elements = document.querySelectorAll('[data-load]');

    elements.forEach(element => {
      const url = element.dataset.load;
      const target = element.dataset.target;

      if (target) {
        element.addEventListener('click', () => {
          this.load(target, url);
        });
      } else {
        this.loadElementContent(element, url);
      }
    });
  },

  loadElementContent: function(element, url) {
    fetch(url)
      .then(response => response.text())
      .then(content => {
        element.innerHTML = content;
      })
      .catch(error => {
        console.error(`Failed to load content from ${url}:`, error);
      });
  },

  loadFile: function(url, fileType) {
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

DynamicLoader.autoLoad();
