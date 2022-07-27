import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import meals from  '../../cypress/mocks/meals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import goatMeals from '../../cypress/mocks/goatMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import beefMeals from '../../cypress/mocks/beefMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import drinks from '../../cypress/mocks/drinks';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import firstLetterMeals from './mocks/firstLetterMeals';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import mockGoat from './mocks/mockGoat';
import mockCorba from './mocks/mockCorba';
import corbaName from './mocks/mockCorbaName';

describe('Filtros Foods', () => {
  beforeEach(async () => {
    global.fetch = jest.fn((url) =>
    Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return mealCategories;
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') return chickenMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return beefMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') return breakfastMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') return dessertMeals
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') return goatMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968') return mockGoat
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return drinks;
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return meals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=') return mealsByIngredient;
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return firstLetterMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=z') return emptyMeals;
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return mockCorba;
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba') return corbaName
      },
    }));
    await act(async () => {
      renderWithRouter(<App />, '/foods');
    });
  });

  it('Ao alternar categoria renderiza na tela', async () => {
    const breakfastCategoryBtn = screen.getByRole('button', {name: /breakfast/i})
    userEvent.click(breakfastCategoryBtn);
    expect(await screen.findByText(/Breakfast Potatoes/i)).toBeInTheDocument();
    const chikenCategoryBtn = screen.getByRole('button', {name: /chicken/i})
    userEvent.click(chikenCategoryBtn);
    expect(await screen.findByText(/Brown Stew Chicken/i)).toBeInTheDocument();
  })

  it('Ao seelecionar bottom "all" aparecem todos os tipo', async () => {
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('All-category-filter'))
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kumpir/i)).toBeInTheDocument();
    expect(await screen.findByText(/Dal fry/i)).toBeInTheDocument();
    const cards = await screen.findAllByTestId(/-recipe-card/)
    expect(cards.length).toEqual(12)
  })

  it('Ao filtrar por breakfast renderiza somente elementos dessa categoria', async () => {
    const breakfastCategoryBtn = screen.getByRole('button', {name: /breakfast/i})
    userEvent.click(breakfastCategoryBtn);
    expect(await screen.findByText(/Breakfast Potatoes/i)).toBeInTheDocument();
  });

  it('Ao filtrar por chicken renderiza somente elementos dessa categoria', async () => {
    const chikenCategoryBtn = screen.getByRole('button', {name: /chicken/i})
    userEvent.click(chikenCategoryBtn);
    expect(await screen.findByText(/Brown Stew Chicken/i)).toBeInTheDocument();
  });

  it('Ao filtrar por dessert renderiza somente elementos dessa categoria', async () => {
    const dessertCategoryBtn = screen.getByRole('button', {name: /dessert/i})
    userEvent.click(dessertCategoryBtn);
      expect(await screen.findByText(/Apple & Blackberry Crumble/i)).toBeInTheDocument();
  });

  it('Ao filtrar por beef renderiza somente elementos dessa categoria', async () => {
    const beefCategoryBtn = screen.getByRole('button', {name: /beef/i})
    userEvent.click(beefCategoryBtn);
    expect(await screen.findByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
  });

  it('Ao filtrar por goat renderiza somente elementos dessa categoria', async () => {
    const goatCategoryBtn = screen.getByRole('button', {name: /goat/i})
    userEvent.click(goatCategoryBtn);
    expect(await screen.findByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();
  });
  it('Ao clicar no botão na categaria duas vezes , seleciona e desselecionar', async () => {
    const breakfastButton  = await screen.findByRole('button', { name: /Breakfast/i })
    userEvent.click(breakfastButton);
    expect(await screen.findByText(/Breakfast Potatoes/i)).toBeInTheDocument();
    userEvent.click(breakfastButton);
    expect(await screen.findByText(/Corba/i)).toBeInTheDocument();
    userEvent.click(breakfastButton)
  })
  it('test', async () => {
    userEvent.click(screen.getByRole('button', {  name: /goat/i}))
    userEvent.click(await screen.findByRole('heading', { name: /mbuzi choma \(roasted goat\)/i }))
  })
  it('corba', async () => {
    userEvent.click(await screen.findByRole('button', { name: /search\-icon/i }))
    userEvent.click(await screen.findByRole('radio', { name: /name/i }))
    userEvent.type(screen.getByRole('textbox'), 'Corba')
    userEvent.click(screen.getByTestId('exec-search-btn'))
  })
})

