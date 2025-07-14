import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders CV parser application', () => {
  render(<App />);
  const linkElement = screen.getByText(/CV Parser/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders upload button', () => {
  render(<App />);
  const uploadButton = screen.getByRole('button', { name: /Upload CV/i });
  expect(uploadButton).toBeInTheDocument();
});

test('renders reviewer panel', () => {
  render(<App />);
  const reviewerPanel = screen.getByText(/Reviewer Panel/i);
  expect(reviewerPanel).toBeInTheDocument();
});