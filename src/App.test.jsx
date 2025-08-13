import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GitHub AI Search application', () => {
  render(<App />);
  const headingElement = screen.getByText('GitHub AI Search');
  expect(headingElement).toBeDefined();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to GitHub AI Search/i);
  expect(welcomeElement).toBeDefined();
});

test('renders main features', () => {
  render(<App />);
  const chatFeature = screen.getByText('AI Chat Assistant');
  const searchFeature = screen.getByText('Smart Repository Search');
  const codeFeature = screen.getByText('Code Understanding');
  
  expect(chatFeature).toBeDefined();
  expect(searchFeature).toBeDefined();
  expect(codeFeature).toBeDefined();
});
