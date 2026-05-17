import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginPage } from './login';

describe('LoginPage', () => {
  it('renders the login form fields', () => {
    render(<LoginPage />);

    expect(screen.getByText(/sign in to cinedash/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('shows validation messages for invalid form values', async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/password/i), '123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      await screen.findByText(/informe um e-mail valido/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i),
    ).toBeInTheDocument();
  });
});
