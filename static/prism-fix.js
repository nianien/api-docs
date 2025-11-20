// Prism.js fix for Scala component error
// This script patches Prism.languages before components try to extend it
(function() {
  'use strict';
  
  // Wait for Prism to be available
  function patchPrism() {
    if (typeof window.Prism !== 'undefined') {
      // Ensure Prism.languages exists
      if (!window.Prism.languages) {
        window.Prism.languages = {};
      }
      
      // Patch the extend method to safely handle undefined cases
      if (window.Prism.languages.extend) {
        const originalExtend = window.Prism.languages.extend;
        window.Prism.languages.extend = function(id, redef) {
          // Ensure the target language object exists
          if (!this[id]) {
            this[id] = {};
          }
          try {
            return originalExtend.call(this, id, redef);
          } catch (e) {
            console.warn('Prism extend error for', id, e);
            return this[id];
          }
        };
      }
      
      // Also patch Prism.languages directly to prevent undefined errors
      const originalLanguages = window.Prism.languages;
      Object.defineProperty(window.Prism, 'languages', {
        get: function() {
          return originalLanguages || {};
        },
        set: function(value) {
          // Allow setting but ensure it's an object
          if (typeof value === 'object' && value !== null) {
            Object.defineProperty(window.Prism, 'languages', {
              value: value,
              writable: true,
              configurable: true
            });
          }
        },
        configurable: true
      });
      
      return true;
    }
    return false;
  }
  
  // Try immediately
  if (!patchPrism()) {
    // If Prism not ready, wait for it
    const checkInterval = setInterval(function() {
      if (patchPrism()) {
        clearInterval(checkInterval);
      }
    }, 50);
    
    // Give up after 5 seconds
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 5000);
  }
})();

