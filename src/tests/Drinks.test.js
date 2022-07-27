import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import firstLetterDrinks from './mocks/firstLetterDrinks';

describe('Testando o componente Foods', () => {
  beforeEach(async () => {
    global.fetch = jest.fn((url) =>
    Promise.resolve({
        json: () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=zzzzz') return Promise.resolve(emptyDrinks);
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y') return Promise.resolve(firstLetterDrinks);
        },
      }),
    );

    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });
  })

  afterEach(() => jest.clearAllMocks());

  it("Verifica se a página renderiza uma lista com os principais drinks", async () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByRole('heading', { name: /gg/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /b\-52/i })).toBeInTheDocument();
  });

  it("Alerta é mostrado na tela ao procurar drink inválido", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/Ingredients/i));
    userEvent.type(screen.getByRole('textbox'), 'zzzzz');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it("Alerta é mostrado na tela ao procurar drink inválido", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/Name/i));
    userEvent.type(screen.getByRole('textbox'), 'zzzzz');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('Filtro é aplicado ao selecionar primeira letra', async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/First Letter/i));
    userEvent.type(screen.getByRole('textbox'), 'y');
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(await screen.findByRole('heading', { name: /yellow bird/i })).toBeInTheDocument();
  });
});
