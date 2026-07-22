import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

function Bomb() { throw new Error('💥'); }

describe('ErrorBoundary', () => {
  it('catches errors and shows fallback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<MemoryRouter><ErrorBoundary><Bomb /></ErrorBoundary></MemoryRouter>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders children when no error', () => {
    render(<MemoryRouter><ErrorBoundary><p>All good</p></ErrorBoundary></MemoryRouter>);
    expect(screen.getByText('All good')).toBeInTheDocument();
  });
});
