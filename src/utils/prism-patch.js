// Prism.js patch to prevent Scala component errors
// This ensures Prism.languages exists before components try to extend it

if (typeof window !== 'undefined') {
  // Wait for Prism to be available
  const checkPrism = setInterval(() => {
    if (window.Prism) {
      // Ensure Prism.languages exists
      if (!window.Prism.languages) {
        window.Prism.languages = {};
      }
      
      // Patch the extend method to handle undefined cases
      const originalExtend = window.Prism.languages.extend;
      if (originalExtend) {
        window.Prism.languages.extend = function(id, redef) {
          if (!this[id]) {
            this[id] = {};
          }
          return originalExtend.call(this, id, redef);
        };
      }
      
      clearInterval(checkPrism);
    }
  }, 100);
  
  // Cleanup after 10 seconds
  setTimeout(() => clearInterval(checkPrism), 10000);
}

// Export Prism if it exists (for server-side)
module.exports = typeof window !== 'undefined' && window.Prism ? window.Prism : {};

