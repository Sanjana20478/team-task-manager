import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the team task manager dashboard', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /plan, assign, and deliver/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /today's execution view/i })).toBeInTheDocument();
});
