import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginPage } from './login';

describe('LoginPage', () => {
  it('renders the login form fields', () => {
    render(<LoginPage />);

    expect(screen.getByText(/cinedash/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('shows validation messages for invalid form values', async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/e-mail/i), 'invalid-email');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), '123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(
      await screen.findByText(/informe um e-mail válido/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i),
    ).toBeInTheDocument();
  });
});
