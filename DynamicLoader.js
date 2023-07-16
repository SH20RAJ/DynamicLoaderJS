// DynamicLoader.js

var dl = (function() {
  // Private variables
  var contentContainerId = 'contentContainer';
  var loadingIndicatorId = 'loadingIndicator';
  var pageNotFoundMessage = 'Page not found.';
  
  // Private function to show loading indicator
  function showLoadingIndicator() {
    var loadingIndicator = document.getElementById(loadingIndicatorId);
    loadingIndicator.style.display = 'block';
  }
  
  // Private function to hide loading indicator
  function hideLoadingIndicator() {
    var loadingIndicator = document.getElementById(loadingIndicatorId);
    loadingIndicator.style.display = 'none';
  }
  
  // Private function to handle AJAX errors
  function handleAjaxError() {
    var contentContainer = document.getElementById(contentContainerId);
    contentContainer.innerHTML = '<p>' + pageNotFoundMessage + '</p>';
    hideLoadingIndicator();
  }
  
  // Public function to load content dynamically
  function loadContent(page) {
    showLoadingIndicator();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var contentContainer = document.getElementById(contentContainerId);
        contentContainer.innerHTML = this.responseText;
        contentContainer.style.display = 'block'; // Show the loaded content
        hideLoadingIndicator();
      } else if (this.readyState === 4) {
        handleAjaxError();
      }
    };
    xhttp.open('GET', page + '.html', true);
    xhttp.send();
  }
  
  // Public function to set the content container ID
  function setContentContainerId(containerId) {
    contentContainerId = containerId;
  }
  
  // Public function to set the loading indicator ID
  function setLoadingIndicatorId(indicatorId) {
    loadingIndicatorId = indicatorId;
  }
  
  // Public function to set the page not found message
  function setPageNotFoundMessage(message) {
    pageNotFoundMessage = message;
  }
  
  // Public function to load dynamic content from data-load attribute
  function loadDynamicContent(element) {
    var url = element.getAttribute('data-load');
    
    if (url) {
      showLoadingIndicator();
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            element.innerHTML = this.responseText;
            element.style.display = 'block'; // Show the loaded content
            hideLoadingIndicator();
          } else {
            handleAjaxError();
          }
        }
      };
      
      xhttp.open('GET', url, true);
      xhttp.send();
    }
  }
  
  // Public function to initialize dynamic content loading
  function initializeDynamicLoading() {
    var dynamicElements = document.querySelectorAll('[dynamic]');
    
    dynamicElements.forEach(function(element) {
      loadDynamicContent(element);
    });
  }
  
  // Public API
  return {
    loadContent: loadContent,
    setContentContainerId: setContentContainerId,
    setLoadingIndicatorId: setLoadingIndicatorId,
    setPageNotFoundMessage: setPageNotFoundMessage,
    loadDynamicContent: loadDynamicContent,
    initializeDynamicLoading: initializeDynamicLoading
  };
})();
