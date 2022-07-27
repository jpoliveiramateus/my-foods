import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import soupMeals from '../../cypress/mocks/soupMeals';
import firstLetterMeals from './mocks/firstLetterMeals';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testando o componente Foods', () => {
  beforeEach(async () => {
    global.fetch = jest.fn((url) =>
    Promise.resolve({
        json: () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
          if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
          if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') return Promise.resolve(chickenMeals);
          if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=') return Promise.resolve(mealsByIngredient);
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') return Promise.resolve(soupMeals);
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return Promise.resolve(firstLetterMeals);
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=z') return Promise.resolve(emptyMeals);
        },
      })
    );

    await act(async () => {
      renderWithRouter(<App />, '/foods');
    });
  })

  afterEach(() => jest.clearAllMocks());

  it("Verifica se a página renderiza uma lista com as principais receitas", async () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Kumpir/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Poutine/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pancakes/i })).toBeInTheDocument();
  });

  it("Filtra a lista por ingredientes *chicken de forma correta", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/ingredients/i));
    userEvent.type(screen.getByRole('textbox'), 'chicken');
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it("Filtra a lista por ingredientes de forma correta", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/ingredients/i));
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
    expect(await screen.findByRole('heading', { name: /Brown Stew Chicken/i })).toBeInTheDocument();
  });

  it("Filtra a lista por nomes de forma correta", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/Name/i));
    userEvent.type(screen.getByRole('textbox'), 'soup');
    userEvent.click(screen.getByTestId('exec-search-btn'));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    expect(await screen.findByRole('heading', { name: /leblebi soup/i })).toBeInTheDocument();
  });

  it("Filtra a lista pela primeira letra de forma correta", async () => {
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/First Letter/i));
    userEvent.type(screen.getByRole('textbox'), 'a');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it("Alerta é mostrado na tela ao procurar refeição inválida", () => {
    jest.spyOn(global, 'alert').mockImplementation(() => 'Your search must have only 1 (one) character');
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/First Letter/i));
    userEvent.type(screen.getByRole('textbox'), 'zz');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });

  it('Alerta é mostrado na tela ao procurar por refeição inválida', () => {
    jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we havent found any recipes for these filters.');
    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    userEvent.click(screen.getByText(/First Letter/i));
    userEvent.type(screen.getByRole('textbox'), 'z');
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
