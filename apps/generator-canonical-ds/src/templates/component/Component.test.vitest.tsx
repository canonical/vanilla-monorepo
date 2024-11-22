/* <%= pkg %> <%= version %> */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import <%= componentName %> from './<%= componentName %>.js';

describe('<%= componentName %> component', () => {
  it('renders without crashing', () => {
    render(<<%= componentName %> />);
    expect(screen.getByText('<%= componentName %>')).toBeDefined();
  });

  it('renders children correctly', () => {
    render(<<%= componentName %>>Hello World</<%= componentName %>>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    const { container } = render(<<%= componentName %> className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});
