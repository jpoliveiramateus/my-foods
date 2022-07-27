import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testando o componente Header', () => {
  beforeEach(async () => {
    global.fetch = jest.fn((url) =>
    Promise.resolve({
        json: () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
          if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
        },
      })
    );
  })

  it("Verifica se a um icone de usuario e um de pesquisa", async () => {
    const { history } = renderWithRouter(<App />, '/foods');
    userEvent.click(await screen.findByRole('button', { name: /search\-icon/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(history.location.pathname).toBe('/profile');
  });
  
  it("Verifica se exite um titulo", () => {
    renderWithRouter(<App />, '/foods');
    expect(screen.getByRole("heading", { name: /foods/i })).toBeInTheDocument();
  });
});
