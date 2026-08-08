import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock useRouter since Header relies on it for active nav highlighting
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

describe('<Header /> Component', () => {
  it('renders logo and brand navigation links', () => {
    render(<Header />);
    expect(screen.getByAltText('Logo UbudKusChain Scan')).toBeInTheDocument();
    expect(screen.getAllByText('Blockchain').length).toBeGreaterThan(0);
  });

  it('renders dropdown navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Blocks')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Top Accounts')).toBeInTheDocument();
    expect(screen.getByText('Validators')).toBeInTheDocument();
    expect(screen.getByText('Analytics & Charts')).toBeInTheDocument();
  });
});
