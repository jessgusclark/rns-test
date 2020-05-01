import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('env variable is correct', () => {
    expect(process.env.REACT_APP_ENVIRONMENT).toBe('local');
  })
});
