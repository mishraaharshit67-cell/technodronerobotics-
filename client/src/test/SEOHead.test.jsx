import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';

describe('SEOHead', () => {
  it('renders without crashing', () => {
    const { container } = render(<HelmetProvider><SEOHead title="Test | TDR" path="/test" /></HelmetProvider>);
    expect(container).toBeTruthy();
  });
});
