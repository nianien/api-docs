// Stub module to replace problematic prism-scala component
// This prevents the "Cannot set properties of undefined" error

// Ensure this module can be required/imported without errors
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}

// Also support ES6 import
if (typeof window !== 'undefined') {
  window.__PRISM_SCALA_STUB__ = true;
}

