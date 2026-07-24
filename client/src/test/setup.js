import '@testing-library/jest-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Provide the Helmet context for components like SEOHead during tests.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

if (!globalThis.IntersectionObserver) {
  class IntersectionObserverMock {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver = IntersectionObserverMock;
}

export const renderWithProviders = (ui) => {
  const { render } = require('@testing-library/react');
  return render(ui, {
    wrapper: ({ children }) => React.createElement(HelmetProvider, null, children),
  });
};
