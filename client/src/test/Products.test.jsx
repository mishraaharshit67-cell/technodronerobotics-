import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../pages/Products';
import { fetchProducts } from '../api';

vi.mock('../api', () => ({
  fetchProducts: vi.fn(),
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div>{children}</div>,
  HelmetProvider: ({ children }) => <div>{children}</div>,
}));

describe('Products page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the products page content', async () => {
    fetchProducts.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Our Products/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
  });
});
