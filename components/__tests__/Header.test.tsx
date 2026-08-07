import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('<Header /> Component', () => {
  it('renders logo and brand navigation links', () => {
    render(<Header />);
    expect(screen.getByAltText('Logo ubudkuscoin scan')).toBeInTheDocument();
    expect(screen.getByText('Live network explorer')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blockchain')).toBeInTheDocument();
  });

  it('renders new Validators and API Docs links', () => {
    render(<Header />);
    const validatorLinks = screen.getAllByText('Validators');
    expect(validatorLinks.length).toBeGreaterThan(0);

    const apiDocsLinks = screen.getAllByText('API Docs');
    expect(apiDocsLinks.length).toBeGreaterThan(0);
  });
});
