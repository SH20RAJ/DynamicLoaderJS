// DynamicLoader.js

// Define the DynamicLoader object
const DynamicLoader = {
  // Function to load content into an element
  load: function(selector, url, loaderElement) {
    // Find the element using the provided selector
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`Element with selector '${selector}' not found.`);
      return;
    }

    // Display the loader element if provided
    if (loaderElement) {
      loaderElement.style.display = 'block';
    }

    // Fetch the content from the specified URL
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

          // Hide the loader element if provided
          if (loaderElement) {
            loaderElement.style.display = 'none';
          }
        }, 500); // Simulate delay for animation
      })
      .catch(error => {
        // Handle error and display an error message
        console.error(`Failed to load content from ${url}:`, error);
        element.innerHTML = '<div class="error-message">Failed to load content.</div>';

        // Hide the loader element if provided
        if (loaderElement) {
          loaderElement.style.display = 'none';
        }
      });
  },

  // Function to automatically load content based on data attributes
  autoLoad: function() {
    // Find all elements with the data-load attribute
    const elements = document.querySelectorAll('[data-load]');

    elements.forEach(element => {
      const url = element.dataset.load;
      const target = element.dataset.target;
      const loader = element.dataset.loader;

      if (target) {
        // If a target is specified, load content when the element is clicked
        element.addEventListener('click', () => {
          const loaderElement = loader === 'true' ? createLoaderElement() : null;
          this.load(target, url, loaderElement);
        });
      } else {
        // If no target is specified, load content into the current element
        this.loadElementContent(element, url);
      }
    });

    // Find all elements with the data-alert attribute
    const alertElements = document.querySelectorAll('[data-alert]');

    alertElements.forEach(element => {
      const alertMessage = element.dataset.alert;
      // Display an alert message when the element is clicked
      element.addEventListener('click', () => {
        alert(alertMessage);
      });
    });

    // Find all elements with the data-url attribute
    const urlElements = document.querySelectorAll('[data-url]');

    urlElements.forEach(element => {
      const url = window.origin + '/' + element.dataset.url;
      // Update the URL in the browser's history when the element is clicked
      element.addEventListener('click', () => {
        window.history.pushState({}, "", url);
      });
    });
  },

  // Function to load content into an element without animation
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

  // Function to load a file dynamically (e.g., CSS or JavaScript)
  loadFile: function(url, fileType) {
    return new Promise((resolve, reject) => {
      let element;
      if (fileType === 'css') {
        // Create a link element for CSS files
        element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = url;
      } else if (fileType === 'js') {
        // Create a script element for JavaScript files
        element = document.createElement('script');
        element.src = url;
      } else {
        reject(new Error(`Unsupported file type: ${fileType}`));
      }

      // Resolve the promise when the file is successfully loaded
      element.onload = () => {
        resolve();
      };

      // Reject the promise if the file fails to load
      element.onerror = () => {
        reject(new Error(`Failed to load file: ${url}`));
      };

      // Append the element to the document's head
      document.head.appendChild(element);
    });
  }
};

// Function to create a loader element
function createLoaderElement() {
  const loaderElement = document.createElement('div');
  loaderElement.className = 'line-loader';
  document.body.appendChild(loaderElement);
  return loaderElement;
}

// Automatically load content and attach event listeners
DynamicLoader.autoLoad();
