/**
 * Component Loader - Dynamically loads HTML components
 * Handles path resolution for both root and pages directories
 */

(function() {
  'use strict';

  // Determine the root path based on current location
  function getRootPath() {
    const path = window.location.pathname;
    // If we're in a subdirectory (like /pages/), go up one level
    if (path.includes('/pages/')) {
      return '../';
    }
    return './';
  }

  // Load a component from the components directory
  async function loadComponent(componentName, containerId) {
    const rootPath = getRootPath();
    const componentPath = `${rootPath}components/${componentName}.html`;
    
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      
      let html = await response.text();
      
      // Replace {ROOT} placeholder with actual root path
      html = html.replace(/{ROOT}/g, rootPath);
      
      // Insert the component into the container
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
        return true;
      } else {
        console.warn(`Container #${containerId} not found for component ${componentName}`);
      }
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
    }

    return false;
  }

  // Load all components when DOM is ready
  function initComponents() {
    const componentLoads = [];

    // Load navigation
    if (document.getElementById('nav-container')) {
      componentLoads.push(loadComponent('nav', 'nav-container'));
    }
    
    // Load footer
    if (document.getElementById('footer-container')) {
      componentLoads.push(loadComponent('footer', 'footer-container'));
    }
    
    // Load modals
    if (document.getElementById('modals-container')) {
      componentLoads.push(loadComponent('modals', 'modals-container'));
    }

    window.componentsReady = Promise.all(componentLoads).then(() => {
      document.dispatchEvent(new CustomEvent('components:loaded'));
    });

    return window.componentsReady;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }

  // Expose loadComponent globally for manual loading if needed
  window.loadComponent = loadComponent;
})();
