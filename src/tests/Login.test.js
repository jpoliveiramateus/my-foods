import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente Login', () => {
  it('Verifica se o botão é habilitado ao digitar um email válido', async () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveAttribute('disabled');
    userEvent.type(screen
      .getByRole('textbox', { name: /login/i }), 'miguelgarcia21@gmail.com');
    userEvent.type(screen.getByLabelText(/senha/i), '1234567');
    expect(screen
      .getByRole('button', { name: 'Entrar' })).not.toHaveAttribute('disabled');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => screen.getByText(/FOODS/i));
    expect(history.location.pathname).toBe('/foods');
  });
});
