import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import { subscribeNewsletter } from '../api';

vi.mock('../api', () => ({
  subscribeNewsletter: vi.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows an error message when newsletter subscription fails', async () => {
    subscribeNewsletter.mockRejectedValueOnce(new Error('fail'));

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/your email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /subscribe to newsletter/i }));

    expect(await screen.findByText(/please try again later/i)).toBeInTheDocument();
  });
});
