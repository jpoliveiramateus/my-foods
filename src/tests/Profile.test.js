import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste da página Profile', () => {
  it("Verifica se o email do usuário é exibido e é possivel fazer o Logout", async () => {
    localStorage.setItem('user', '{"email":"robsonsilva2@gmail.com"}')

    const { history } = renderWithRouter(<App />, '/profile');
    expect(screen.getByText(/robsonsilva2@gmail\.com/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(history.location.pathname).toBe('/');
  });

  it("Verifica se o redirecionamento para a página de receitas prontas é realizada", () => {
    const { history } = renderWithRouter(<App />, '/profile');

    userEvent.click(screen.getByRole('button', { name: /done recipes/i }));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it("Verifica se o redirecionamento para a página de receitas favoritas é realizada", () => {
    const { history } = renderWithRouter(<App />, '/profile');

    userEvent.click(screen.getByRole('button', { name: /favorite recipes/i }));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
