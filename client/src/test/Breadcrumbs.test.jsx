import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

describe('Breadcrumbs', () => {
  it('does not render on root path', () => {
    const { container } = render(<MemoryRouter initialEntries={['/']}><Breadcrumbs /></MemoryRouter>);
    expect(container.innerHTML).toBe('');
  });

  it('renders breadcrumb for subpage', () => {
    render(<MemoryRouter initialEntries={['/about']}><Breadcrumbs /></MemoryRouter>);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('does not render on admin paths', () => {
    const { container } = render(<MemoryRouter initialEntries={['/admin']}><Breadcrumbs /></MemoryRouter>);
    expect(container.innerHTML).toBe('');
  });
});
