import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders app header brand', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /thrift place/i })).toBeInTheDocument();
});

